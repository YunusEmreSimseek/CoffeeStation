using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Features.CQRS.Queries.AddressQueries
{
    public class GetAddressByUserIdQuery
    {
        public string UserId { get; set; }

    }
}