using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoffeeStation.Discount.Dtos;
using CoffeeStation.Discount.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStation.Discount.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DiscountController : ControllerBase
    {
        private readonly IDiscountService _discountService;

        public DiscountController(IDiscountService discountService)
        {
            _discountService = discountService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllCoupons()
        {
            var values = await _discountService.GetAllCouponsAsync();
            return Ok(values);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetCouponById(int id)
        {
            var values = await _discountService.GetCouponByIdAsync(id);
            if (values == null) return NotFound("Böyle bir kupon bulunamadı.");
            return Ok(values);
        }

        [Authorize]
        [HttpGet("code/{code}")]
        public async Task<IActionResult> GetCouponByCode(string code)
        {
            var values = await _discountService.GetCouponByCodeAsync(code);
            if (values == null) return NotFound("Böyle bir kupon bulunamadı.");
            return Ok(values);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateCoupon(CreateDiscountCouponDto createDiscountCouponDto)
        {
            await _discountService.CreateCouponAsync(createDiscountCouponDto);
            return Ok("Kupon başarıyla oluşturuldu.");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public async Task<IActionResult> DeleteCoupon(int id)
        {
            await _discountService.DeleteCouponAsync(id);
            return Ok("Kupon başarıyla silindi.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> UpdateCoupon(UpdateDiscountCouponDto updateDiscountCouponDto)
        {
            await _discountService.UpdateCouponAsync(updateDiscountCouponDto);
            return Ok("Kupon başarıyla güncellendi.");
        }
    }
}