using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Features.CQRS.Commands.OrderCommands;
using Application.Features.CQRS.Handlers.OrderHandlers;
using Application.Features.CQRS.Queries.OrderQueries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly GetOrderQueryHandler _getOrderQueryHandler;
        private readonly GetOrderByIdQueryHandler _getOrderByIdQueryHandler;
        private readonly GetOrderByUserIdQueryHandler _getOrderByUserIdQueryHandler;
        private readonly CreateOrderCommandHandler _createOrderCommandHandler;
        private readonly RemoveOrderCommandHandler _removeOrderCommandHandler;
        private readonly UpdateOrderCommandHandler _updateOrderCommandHandler;

        public OrderController(
            GetOrderQueryHandler getOrderQueryHandler,
            GetOrderByIdQueryHandler getOrderByIdQueryHandler,
            GetOrderByUserIdQueryHandler getOrderByUserIdQueryHandler,
            CreateOrderCommandHandler creatwOrderCommandHandler,
            RemoveOrderCommandHandler removeOrderCommandHandler,
            UpdateOrderCommandHandler updateOrderCommandHandler
        )
        {
            _getOrderQueryHandler = getOrderQueryHandler;
            _getOrderByIdQueryHandler = getOrderByIdQueryHandler;
            _getOrderByUserIdQueryHandler = getOrderByUserIdQueryHandler;
            _createOrderCommandHandler = creatwOrderCommandHandler;
            _removeOrderCommandHandler = removeOrderCommandHandler;
            _updateOrderCommandHandler = updateOrderCommandHandler;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var values = await _getOrderQueryHandler.Handle();
            return Ok(values);
        }

        [Authorize(Roles = "Admin")]
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

        [Authorize]
        [HttpGet("userId/{userId}")]
        public async Task<IActionResult> GetOrderByUserId(string userId)
        {
            var value = await _getOrderByUserIdQueryHandler.Handle(
                new GetOrderByUserIdQuery { UserId = userId }
            );
            if (value == null)
            {
                return NotFound("Siparis bulunamadi.");
            }
            return Ok(value);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderCommand command)
        {
            await _createOrderCommandHandler.Handle(command);
            return Ok("Siparis detayi basariyla eklendi.");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public async Task<IActionResult> RemoveOrder(int id)
        {
            await _removeOrderCommandHandler.Handle(new RemoveOrderCommand { OrderId = id });
            return Ok("Siparis detayi basariyla silindi.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> UpdateOrder(UpdateOrderCommand command)
        {
            await _updateOrderCommandHandler.Handle(command);
            return Ok("Siparis detayi basariyla guncellendi.");
        }
    }
}