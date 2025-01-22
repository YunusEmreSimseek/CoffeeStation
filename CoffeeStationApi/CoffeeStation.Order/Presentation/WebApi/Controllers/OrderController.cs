using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Features.CQRS.Commands.OrderCommands;
using Application.Features.CQRS.Handlers.OrderHandlers;
using Application.Features.CQRS.Queries.OrderQueries;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly GetOrderQueryHandler _getOrderQueryHandler;
        private readonly GetOrderByIdQueryHandler _getOrderByIdQueryHandler;
        private readonly CreateOrderCommandHandler _createOrderCommandHandler;
        private readonly RemoveOrderCommandHandler _removeOrderCommandHandler;
        private readonly UpdateOrderCommandHandler _updateOrderCommandHandler;

        public OrderController(
            GetOrderQueryHandler getOrderQueryHandler,
            GetOrderByIdQueryHandler getOrderByIdQueryHandler,
            CreateOrderCommandHandler creatwOrderCommandHandler,
            RemoveOrderCommandHandler removeOrderCommandHandler,
            UpdateOrderCommandHandler updateOrderCommandHandler
        )
        {
            _getOrderQueryHandler = getOrderQueryHandler;
            _getOrderByIdQueryHandler = getOrderByIdQueryHandler;
            _createOrderCommandHandler = creatwOrderCommandHandler;
            _removeOrderCommandHandler = removeOrderCommandHandler;
            _updateOrderCommandHandler = updateOrderCommandHandler;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var values = await _getOrderQueryHandler.Handle();
            return Ok(values);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var value = await _getOrderByIdQueryHandler.Handle(
                new GetOrderByIdQuery { OrderId = id }
            );
            if (value == null)
            {
                return NotFound("Siparis bulunamadi.");
            }
            return Ok(value);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderCommand command)
        {
            await _createOrderCommandHandler.Handle(command);
            return Ok("Siparis detayi basariyla eklendi.");
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveOrder(int id)
        {
            await _removeOrderCommandHandler.Handle(new RemoveOrderCommand { OrderId = id });
            return Ok("Siparis detayi basariyla silindi.");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateOrder(UpdateOrderCommand command)
        {
            await _updateOrderCommandHandler.Handle(command);
            return Ok("Siparis detayi basariyla guncellendi.");
        }
    }
}