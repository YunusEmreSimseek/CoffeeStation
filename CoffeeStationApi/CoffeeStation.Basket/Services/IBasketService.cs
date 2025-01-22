using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoffeeStation.Basket.Dtos;

namespace CoffeeStation.Basket.Services
{
    public interface IBasketService
    {
        Task<BasketDto> GetBasket(string userId);

        Task SaveBasket(BasketDto basketDto);

        Task DeleteBasket(string userId);
    }
}