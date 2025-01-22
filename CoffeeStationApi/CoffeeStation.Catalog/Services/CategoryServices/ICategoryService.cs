using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoffeeStation.Catalog.Dtos.CategoryDtos;

namespace CoffeeStation.Catalog.Services.CategoryServices
{
    public interface ICategoryService
    {
        Task<List<ResultCategoryDto>> GetAllCategoryAsync();

        Task CreateCategoryAsync(CreateCategoryDto createCategoryDto);

        Task UpdateCategoryAsync(UpdateCategoryDto updateCategoryDto);

        Task DeleteCategoryAsync(string id);

        Task<GetByIdCategoryDto> GetByIdCategoryAsync(string id);
    }
}