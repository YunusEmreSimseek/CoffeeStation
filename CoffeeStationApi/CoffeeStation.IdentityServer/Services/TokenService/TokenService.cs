using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoffeeStation.IdentityServer.Dtos.TokenDtos;
using Newtonsoft.Json;

namespace CoffeeStation.IdentityServer.Services.TokenService
{
    public class TokenService
    {
        private readonly string tokenEndpoint = "http://localhost:5001/connect/token";

        public async Task<string?> TakeUserToken(CreateTokenDto createTokenDto){
             // Token istegi atiyoruz
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