using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoffeeStation.Basket.Dtos;
using CoffeeStation.Basket.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStation.Basket.Controllers
{   
    
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly IBasketService _basketService;
        public BasketController(IBasketService basketService)
        {
            _basketService = basketService;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUserBasket(string userId)
        {
            var values = await _basketService.GetBasket(userId);
            return Ok(values);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> SaveUserBasket(BasketDto basketDto)
        {
            await _basketService.SaveBasket(basketDto);
            return Ok("Sepetteki degisiklikler kaydedildi");
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteUserBasket(string userId)
        {
            await _basketService.DeleteBasket(userId);
            return Ok("Sepet basariyla silindi");
        }
    }
}