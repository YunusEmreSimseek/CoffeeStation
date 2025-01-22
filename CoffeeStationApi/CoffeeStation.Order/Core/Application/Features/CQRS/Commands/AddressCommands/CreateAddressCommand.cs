using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Features.CQRS.Commands.AddressCommands
{
    public class CreateAddressCommand
    {
        public string UserId { get; set; }

        public string District { get; set; }

        public string City { get; set; }

        public string Detail { get; set; }
    }
}