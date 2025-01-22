using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoffeeStation.Discount.Dtos;
using CoffeeStation.Discount.Entities;

namespace CoffeeStation.Discount.Services
{
    public interface IDiscountService
    {
        Task<List<ResultDiscountCoupon>> GetAllCouponsAsync();
        Task<ResultDiscountCoupon?> GetCouponByIdAsync(int id);
        Task<ResultDiscountCoupon?> GetCouponByCodeAsync(string code);
        Task CreateCouponAsync(CreateDiscountCouponDto createDiscountCouponDto);
        Task UpdateCouponAsync(UpdateDiscountCouponDto updateDiscountCouponDto);
        Task DeleteCouponAsync(int id);
    }
}