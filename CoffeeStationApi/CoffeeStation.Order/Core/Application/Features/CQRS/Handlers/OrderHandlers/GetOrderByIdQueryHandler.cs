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
    public class GetOrderByIdQueryHandler
    {
        private readonly IRepository<Order> _repository;

        public GetOrderByIdQueryHandler(IRepository<Order> repository)
        {
            _repository = repository;
        }

        public async Task<GetOrderByIdQueryResult?> Handle(GetOrderByIdQuery query)
        {
            var values = await _repository.GetByIdAsync(query.OrderId);
            if (values == null)
            {
                return null;
            }
            return new GetOrderByIdQueryResult
            {
                OrderId = values.OrderId,
                UserId = values.UserId,
                ProductIds = values.ProductIds,
                TotalPrice = values.TotalPrice,
                AddressId = values.AddressId,
            };
        }
    }
}