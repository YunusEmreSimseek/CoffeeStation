using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeeStation.Discount.Entities
{
    public class Coupon
    {
        public int CouponId { get; set; }

        public string? Code { get; set; }

        public int Rate { get; set; }


    }
}