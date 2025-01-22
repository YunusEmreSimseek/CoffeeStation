using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CoffeeStation.IdentityServer.Models;
using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;

namespace CoffeeStation.IdentityServer.Services
{
    public class CustomProfileService : IProfileService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public CustomProfileService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
             // Token oluşturulurken hangi claim’leri vereceğimizi bu metotta belirliyoruz.
        var userId = context.Subject.GetSubjectId(); // userId çek
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
            return;

        // Kullanıcının halihazırdaki claim’lerini alıyoruz
        var userClaims = new List<Claim>
        {
            new Claim(JwtClaimTypes.Name, user.UserName ?? string.Empty),
            new Claim(JwtClaimTypes.Email, user.Email ?? string.Empty)
        };

        // Kullanıcının rolleri
        var roles = await _userManager.GetRolesAsync(user);
        foreach (var role in roles)
        {
            userClaims.Add(new Claim(JwtClaimTypes.Role, role));
        }

        // IdentityServer'a verilecek claim’leri ayarla
        context.IssuedClaims = userClaims;
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
              // Kullanıcının aktif olup olmadığını kontrol edebilirsiniz
            var userId = context.Subject.GetSubjectId();
            var user = await _userManager.FindByIdAsync(userId);
            context.IsActive = user != null;
        }
    }
}