using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoffeeStation.Discount.Context;
using CoffeeStation.Discount.Dtos;
using CoffeeStation.Discount.Entities;
using Microsoft.EntityFrameworkCore;

namespace CoffeeStation.Discount.Services
{
    public class DiscountService : IDiscountService
    {
        private readonly ApplicationDbContext _context;
         public DiscountService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateCouponAsync(CreateDiscountCouponDto createDiscountCouponDto)
        {
            var coupon = new Coupon
            {
                Code = createDiscountCouponDto.Code,
                Rate = createDiscountCouponDto.Rate,

            };
            _context.Coupons.Add(coupon);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCouponAsync(int id)
        {
            var existingCoupon = await _context.Coupons.FindAsync(id);
             if (existingCoupon != null)
            {
                _context.Coupons.Remove(existingCoupon);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<ResultDiscountCoupon>> GetAllCouponsAsync()
        {
            return await _context.Coupons.Select(c => new ResultDiscountCoupon
            {
                CouponId = c.CouponId,
                Code = c.Code,
                Rate = c.Rate,

            }).ToListAsync();

        }

        public async Task<ResultDiscountCoupon?> GetCouponByCodeAsync(string code)
        {
            var coupon = await _context.Coupons.FirstOrDefaultAsync(c => c.Code == code);
            if (coupon == null)
            {
                return null;
            }
            var result = new ResultDiscountCoupon
            {
                CouponId = coupon.CouponId,
                Code = coupon.Code,
                Rate = coupon.Rate,

            };
            return result;


        }

        public async Task<ResultDiscountCoupon?> GetCouponByIdAsync(int id)
        {
            var coupon = await _context.Coupons.FindAsync(id);
            if (coupon == null)
            {
                return null;
            }

            return new ResultDiscountCoupon
            {
                CouponId = coupon.CouponId,
                Code = coupon.Code,
                Rate = coupon.Rate,

            };
        }

        public async Task UpdateCouponAsync(UpdateDiscountCouponDto updateDiscountCouponDto)
        {
            var coupon = new Coupon
            {
                CouponId = updateDiscountCouponDto.CouponId,
                Code = updateDiscountCouponDto.Code,
                Rate = updateDiscountCouponDto.Rate,

            };
            _context.Coupons.Update(coupon);
            await _context.SaveChangesAsync();
        }
    }
}