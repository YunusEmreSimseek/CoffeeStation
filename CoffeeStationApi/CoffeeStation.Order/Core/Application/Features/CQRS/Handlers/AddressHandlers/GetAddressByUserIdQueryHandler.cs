using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Features.CQRS.Queries.AddressQueries;
using Application.Features.CQRS.Results.AddressResults;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Features.CQRS.Handlers.AddressHandlers
{
    public class GetAddressByUserIdQueryHandler
    {
        private readonly IRepository<Address> _repository;

        public GetAddressByUserIdQueryHandler(IRepository<Address> repository)
        {
            _repository = repository;
        }

        public async Task<GetAddressByUserIdQueryResult?> Handle(GetAddressByUserIdQuery query)
        {
            var value = await _repository.GetByFilterAsync(x => x.UserId == query.UserId);
            if (value == null)
            {
                return null;
            }
            return new GetAddressByUserIdQueryResult
            {
                AddressId = value.AddressId,
                City = value.City,
                Detail = value.Detail,
                District = value.District,
                UserId = value.UserId,
            };
        }
    }
}