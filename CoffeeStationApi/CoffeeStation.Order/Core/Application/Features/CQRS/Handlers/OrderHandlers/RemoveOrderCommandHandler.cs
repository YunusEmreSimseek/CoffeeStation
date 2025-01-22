using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Features.CQRS.Commands.OrderCommands;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Features.CQRS.Handlers.OrderHandlers
{
    public class RemoveOrderCommandHandler
    {
        private readonly IRepository<Order> _repository;

        public RemoveOrderCommandHandler(IRepository<Order> repository)
        {
            _repository = repository;
        }

        public async Task Handle(RemoveOrderCommand command)
        {
            var value = await _repository.GetByIdAsync(command.OrderId);
            if (value == null)
            {
                throw new ApplicationException("Siparis bulunamadi.");
            }
            await _repository.DeleteAsync(value);
        }
    }
}