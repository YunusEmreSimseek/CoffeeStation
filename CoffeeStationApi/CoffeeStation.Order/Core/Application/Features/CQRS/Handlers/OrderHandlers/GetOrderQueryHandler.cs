using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Features.CQRS.Results.OrderResults;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Features.CQRS.Handlers.OrderHandlers
{
    public class GetOrderQueryHandler
    {
        private readonly IRepository<Order> _repository;

        public GetOrderQueryHandler(IRepository<Order> repository)
        {
            _repository = repository;
        }

        public async Task<List<GetOrderQueryResult>> Handle()
        {
            var values = await _repository.GetAllAsync();
            return values
                .Select(x => new GetOrderQueryResult
                {
                    OrderId = x.OrderId,
                    UserId = x.UserId,
                    ProductIds = x.ProductIds,
                    TotalPrice = x.TotalPrice,
                    AddressId = x.AddressId,
                })
                .ToList();
        }
    }
}