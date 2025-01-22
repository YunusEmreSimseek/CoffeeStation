using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Features.CQRS.Queries.OrderQueries;
using Application.Features.CQRS.Results.OrderResults;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Features.CQRS.Handlers.OrderHandlers
{
    public class GetOrderByUserIdQueryHandler
    {
        private readonly IRepository<Order> _repository;

        public GetOrderByUserIdQueryHandler(IRepository<Order> repository)
        {
            _repository = repository;
        }

        public async Task<GetOrderByUserIdQueryResult?> Handle(GetOrderByUserIdQuery query)
        {
            var value = await _repository.GetByFilterAsync(x => x.UserId == query.UserId);
            if (value == null)
            {
                return null;
            }
            return new GetOrderByUserIdQueryResult
            {
                OrderId = value.OrderId,
                UserId = value.UserId,
                ProductIds = value.ProductIds,
                TotalPrice = value.TotalPrice,
                AddressId = value.AddressId,
            };
        }
    }
}