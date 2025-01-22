using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoffeeStation.IdentityServer.Dtos.TokenDtos;
using CoffeeStation.IdentityServer.Dtos.UserDtos;
using CoffeeStation.IdentityServer.Models;
using CoffeeStation.IdentityServer.Services.TokenService;
using IdentityServer4;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStation.IdentityServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly TokenService _tokenService;

        public UserController(
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            TokenService tokenService
            )
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(LoginUserDto loginUserDto){
            // Kullanici adi ve sifre dogrulama
            var responseSignIn = await _signInManager.PasswordSignInAsync(loginUserDto.Username, loginUserDto.Password, false, false);
            if (!responseSignIn.Succeeded)  return  Unauthorized("Kullanıcı adı veya şifre hatalı.");; 

            // Kullanici bilgilerini al
            var user = await _userManager.FindByNameAsync(loginUserDto.Username);
            if (user == null) return Unauthorized("Kullanıcı bulunamadı.");

            // Token icin kullanici bilgilerini hazirla
            var createTokenDto =new CreateTokenDto{
                GrantType = "password",
                ClientId = "",
                ClientSecret = "coffeestationsecret",
                Username = loginUserDto.Username,
                Password = loginUserDto.Password,
                Role = ""
            };

            // Kullanıcı rollerini alalım
            var userRoles = await _userManager.GetRolesAsync(user);
            if (userRoles.Contains("Admin")){
                createTokenDto.ClientId = "CoffeeStationAdminId";
                createTokenDto.Role = "Admin";
            }
            else {
                createTokenDto.ClientId = "CoffeeStationUserId";
                createTokenDto.Role = "User";
            }

            // Kullanici icin token alalim
            var tokenResponse = await _tokenService.TakeUserToken(createTokenDto);
            if (tokenResponse == null) return Unauthorized("Token oluşturulamadı.");

            return Ok(new LoginUserResultDto
            {
                UserId = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Token = tokenResponse,
                Role = createTokenDto.Role
            });



        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterUserDto registerUserDto){
            // Kullanici var mi kontrol et
            var existingUser = await _userManager.FindByEmailAsync(registerUserDto.Email);
            if (existingUser != null) return BadRequest("Bu e-posa zaten kullanımda.");

            // Kullaniciyi olustur
            var values = new ApplicationUser()
            {
                UserName = registerUserDto.Username,
                Email = registerUserDto.Email,
                Name = registerUserDto.Name,
                Surname = registerUserDto.Surname,
            };
            var createUserResult = await _userManager.CreateAsync(values, registerUserDto.Password);
            if (!createUserResult.Succeeded) return BadRequest("Kullanıcı oluşturulamadı.");

            // Kullaniciya role ata ve bitir
            await _userManager.AddToRoleAsync(values, "User");
            return Ok("Kayıt başarıyla tamamlandı.");
        }


        [Authorize(Policy = IdentityServerConstants.LocalApi.PolicyName)]
        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser(CreateUserDto createUserDto){

            // Kullanici var mi kontrol et
            var existingUser = await _userManager.FindByEmailAsync(createUserDto.Email);
            if (existingUser != null) return BadRequest("Bu e-posa zaten kullanımda.");

            // Kullaniciyi olustur
            var values = new ApplicationUser()
            {
                UserName = createUserDto.Username,
                Email = createUserDto.Email,
                Name = createUserDto.Name,
                Surname = createUserDto.Surname,
            };
            var createUserResult = await _userManager.CreateAsync(values, createUserDto.Password);
            if (!createUserResult.Succeeded) return BadRequest("Kullanıcı oluşturulamadı.");

            // Kullaniciya role ata ve bitir
            if (createUserDto.Role == "Admin")
                await _userManager.AddToRoleAsync(values, "Admin");
            else
                await _userManager.AddToRoleAsync(values, "User");

            return Ok("Kullanıcı başarıyla oluşturuldu.");
        }

        [Authorize(Policy = IdentityServerConstants.LocalApi.PolicyName)]
        [HttpDelete("delete-user")]
        public async Task<IActionResult> DeleteUser(string id){
            // Kullaniciyi bul
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return BadRequest("Kullanıcı bulunamadı.");

            // Kullaniciyi sil
            var deleteUserResult = await _userManager.DeleteAsync(user);
            if (!deleteUserResult.Succeeded) return BadRequest("Kullanıcı silinemedi.");

            return Ok("Kullanıcı başarıyla silindi.");
        }
    
        [Authorize(Policy = IdentityServerConstants.LocalApi.PolicyName)]
        [HttpGet("get-users")]
        public async Task<IActionResult> GetAllUsers(){
            var users = _userManager.Users.ToList();
            var gettedUsers = new List<GetUserResultDto>();
            foreach (var user in users)
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                bool isAdmin = userRoles.Contains("Admin");
                var role = isAdmin ? "Admin" : "User";
                var getUser = new GetUserResultDto
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Email = user.Email,
                    Name = user.Name,
                    Surname = user.Surname,
                    Password = user.PasswordHash,
                    Role = role
                };
                gettedUsers.Add(getUser);
            }
            return Ok(gettedUsers);
        }
    
        [Authorize(Policy = IdentityServerConstants.LocalApi.PolicyName)]
        [HttpGet("get-user")]
        public async Task<IActionResult> GetUser(string id){
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return BadRequest("Kullanıcı bulunamadı.");
            var userRoles = await _userManager.GetRolesAsync(user);
            bool isAdmin = userRoles.Contains("Admin");
            var role = isAdmin ? "Admin" : "User";
            var getUser = new GetUserResultDto
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                Password = user.PasswordHash,
                Role = role
            };
            return Ok(getUser);
        }
    
        [Authorize(Policy = IdentityServerConstants.LocalApi.PolicyName)]
        [HttpGet("update-user")]
        public async Task<IActionResult> UpdateUser(UpdateUserDto updateUserDto){
            var user = await _userManager.FindByIdAsync(updateUserDto.Id);
            if (user == null) return BadRequest("Kullanıcı bulunamadı.");
            user.UserName = updateUserDto.Username;
            user.Email = updateUserDto.Email;
            user.Name = updateUserDto.Name;
            user.Surname = updateUserDto.Surname;
            user.PasswordHash = updateUserDto.Password;
            var userRoles = await _userManager.GetRolesAsync(user);
            if (userRoles.Contains("Admin") && updateUserDto.Role == "User")
            {
                await _userManager.RemoveFromRoleAsync(user, "Admin");
                await _userManager.AddToRoleAsync(user, "User");
            }
            else if (userRoles.Contains("User") && updateUserDto.Role == "Admin")
            {
                await _userManager.RemoveFromRoleAsync(user, "User");
                await _userManager.AddToRoleAsync(user, "Admin");
            }
            var updateUserResult = await _userManager.UpdateAsync(user);
            if (!updateUserResult.Succeeded) return BadRequest("Kullanıcı güncellenemedi.");
            return Ok("Kullanıcı başarıyla güncellendi.");
        }

        [AllowAnonymous]
        [HttpGet("take-anonymous-token")]
        public async Task<IActionResult> TakeAnonymousToken(){
            var tokenResponse = await _tokenService.TakeAnonymousToken();
            if (tokenResponse == null) return Unauthorized("Token oluşturulamadı.");
            return Ok(tokenResponse);
    }
        

        [Authorize]
        [HttpGet("logout")]
        public async Task<IActionResult> Logout(){
            await _signInManager.SignOutAsync();
            return Ok("Çıkış yapıldı.");
        }
}
}