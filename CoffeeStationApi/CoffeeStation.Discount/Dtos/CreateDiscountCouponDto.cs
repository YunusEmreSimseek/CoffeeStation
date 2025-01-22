using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeeStation.Discount.Dtos
{
    public class CreateDiscountCouponDto
    {
        public string? Code { get; set; }

        public int Rate { get; set; }

    }
}