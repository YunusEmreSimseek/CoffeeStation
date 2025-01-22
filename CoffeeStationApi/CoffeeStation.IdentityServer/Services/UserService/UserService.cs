using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using CoffeeStation.IdentityServer.Dtos.TokenDtos;
using CoffeeStation.IdentityServer.Dtos.UserDtos;
using CoffeeStation.IdentityServer.Models;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace CoffeeStation.IdentityServer.Services.UserService
{
    public class UserService
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly string tokenEndpoint = "http://localhost:5001/connect/token";

        public UserService(
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager
            )
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }
        

        public async Task<string?> TokenUser(CreateTokenDto createTokenDto){
            // Toke istegi atiyoruz
            using var httpClient = new HttpClient();
            var requestBody = new Dictionary<string, string>
            {
                { "grant_type", createTokenDto.GrantType },
                { "client_id", createTokenDto.ClientId },
                { "client_secret", createTokenDto.ClientSecret },
                { "username", createTokenDto.Username },
                { "password", createTokenDto.Password }
            };
            var response = await httpClient.PostAsync(tokenEndpoint, new FormUrlEncodedContent(requestBody));
            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            // Yanıtı isledik
            var responseString = await response.Content.ReadAsStringAsync();
            var tokenResponse = JsonConvert.DeserializeObject<TokenResultDto>(responseString);
            return tokenResponse.AccessToken;
        }
    }
}