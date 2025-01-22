using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Order
    {
        public int OrderId { get; set; }

        public string UserId { get; set; }

        public List<string> ProductIds { get; set; }

        public decimal TotalPrice { get; set; }

        public int AddressId { get; set; }
    }
}