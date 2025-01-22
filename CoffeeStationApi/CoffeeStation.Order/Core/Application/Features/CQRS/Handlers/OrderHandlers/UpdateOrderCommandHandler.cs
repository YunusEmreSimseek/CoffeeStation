using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Features.CQRS.Commands.OrderCommands;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Features.CQRS.Handlers.OrderHandlers
{
    public class UpdateOrderCommandHandler
    {
        private readonly IRepository<Order> _repository;

        public UpdateOrderCommandHandler(IRepository<Order> repository)
        {
            _repository = repository;
        }

        public async Task Handle(UpdateOrderCommand command)
        {
            var values = await _repository.GetByIdAsync(command.OrderId);
            if (values == null)
            {
                throw new Exception("Siparis bulunamadi.");
            }
            values.OrderId = command.OrderId;
            values.UserId = command.UserId;
            values.ProductIds = command.ProductIds;
            values.TotalPrice = command.TotalPrice;
            values.AddressId = command.AddressId;
            await _repository.UpdateAsync(values);
        }
    }
}