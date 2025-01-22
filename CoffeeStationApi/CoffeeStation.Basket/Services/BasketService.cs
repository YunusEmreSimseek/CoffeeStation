using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using CoffeeStation.Basket.Dtos;
using CoffeeStation.Basket.Settings;

namespace CoffeeStation.Basket.Services
{
    public class BasketService : IBasketService
    {

        private readonly RedisService _redisService;

        public BasketService(RedisService redisService)
        {
            _redisService = redisService;
        }
        public async Task DeleteBasket(string userId)
        {
            await _redisService.GetDb().KeyDeleteAsync(userId);
        }

        public async Task<BasketDto> GetBasket(string userId)
        {
            var existBasket = await _redisService.GetDb().StringGetAsync(userId);
            if (existBasket.IsNullOrEmpty)
            {
                var basket = new BasketDto
                {
                    UserId = userId,
                    BasketItems = new List<BasketItemDto>()
                };
                return basket;
            }
            return JsonSerializer.Deserialize<BasketDto>(existBasket);
        }

        public async Task SaveBasket(BasketDto basketDto)
        {
             await _redisService
                .GetDb()
                .StringSetAsync(basketDto.UserId, JsonSerializer.Serialize(basketDto));
        }
    }
}