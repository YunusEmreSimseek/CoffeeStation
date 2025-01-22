using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeeStation.IdentityServer.Dtos.UserDtos
{
    public class LoginUserResultDto
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public string Token { get; set; }

        public string Role { get; set; }
    }
}