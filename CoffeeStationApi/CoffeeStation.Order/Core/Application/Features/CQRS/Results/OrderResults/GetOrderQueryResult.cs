using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Features.CQRS.Results.OrderResults
{
    public class GetOrderQueryResult
    {
        public int OrderId { get; set; }

        public string UserId { get; set; }

        public List<string> ProductIds { get; set; }

        public decimal TotalPrice { get; set; }

        public int AddressId { get; set; }
    }
}