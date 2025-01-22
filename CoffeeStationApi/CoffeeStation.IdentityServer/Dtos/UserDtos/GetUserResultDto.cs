using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeeStation.IdentityServer.Dtos.UserDtos
{
    public class GetUserResultDto
    {
        public string Id { get; set; }
        public string Username { get; set; }

        public string Email { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }
    }
}