using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoffeeStation.Catalog.Dtos.ProductDtos;

namespace CoffeeStation.Catalog.Services.ProductServices
{
    public interface IProductService
    {
        Task<List<ResultProductDto>> GetAllProductAsync();

        Task CreateProductAsync(CreateProductDto createProductDto);

        Task UpdateProductAsync(UpdateProductDto updateProductDto);

        Task DeleteProductAsync(string id);

        Task<GetByIdProductDto> GetByIdProductAsync(string id);

        Task<GetByCategoryIdProductDto> GetByCategoryIdProductAsync(string id);
    }
}