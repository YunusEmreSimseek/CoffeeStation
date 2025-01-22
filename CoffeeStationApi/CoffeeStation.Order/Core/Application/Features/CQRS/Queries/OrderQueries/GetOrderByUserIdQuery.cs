using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Features.CQRS.Queries.OrderQueries
{
    public class GetOrderByUserIdQuery
    {
        public string UserId { get; set; }
    }
}