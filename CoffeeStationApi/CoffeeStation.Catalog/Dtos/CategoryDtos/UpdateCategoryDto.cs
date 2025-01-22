using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeeStation.Catalog.Dtos.CategoryDtos
{
    public class UpdateCategoryDto
    {
        public string? CategoryId { get; set; }
        public string? CategoryName { get; set; }
    }
}