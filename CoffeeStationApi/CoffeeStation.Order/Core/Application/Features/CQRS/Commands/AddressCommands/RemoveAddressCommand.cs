using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Features.CQRS.Commands.AddressCommands
{
    public class RemoveAddressCommand
    {
        public int AddressId { get; set; }

    }
}