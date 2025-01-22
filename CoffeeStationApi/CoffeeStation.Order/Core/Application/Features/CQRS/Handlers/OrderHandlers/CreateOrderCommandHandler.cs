using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Features.CQRS.Commands.OrderCommands;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Features.CQRS.Handlers.OrderHandlers
{
    public class CreateOrderCommandHandler
    {
        private readonly IRepository<Order> _repository;

        public CreateOrderCommandHandler(IRepository<Order> repository)
        {
            _repository = repository;
        }

        public async Task Handle(CreateOrderCommand command)
        {
            await _repository.CreateAsync(
                new Order {
                    UserId = command.UserId,
                    ProductIds = command.ProductIds,
                    TotalPrice = command.TotalPrice,
                    AddressId = command.AddressId,
                }
            );
        }
    }
}