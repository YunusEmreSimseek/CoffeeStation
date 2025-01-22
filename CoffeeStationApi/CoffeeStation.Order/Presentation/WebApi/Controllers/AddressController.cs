using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Features.CQRS.Commands.AddressCommands;
using Application.Features.CQRS.Handlers.AddressHandlers;
using Application.Features.CQRS.Queries.AddressQueries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressController : ControllerBase
    {
        private readonly GetAddressQueryHandler _getAddressQueryHandler;
        private readonly GetAddressByIdQueryHandler _getAddressByIdQueryHandler;
        private readonly GetAddressByUserIdQueryHandler _getAddressByUserIdQueryHandler;
        private readonly CreateAddressCommandHandler _createAddressCommandHandler;
        private readonly UpdateAddressCommandHandler _updateAddressCommandHandler;
        private readonly RemoveAddressCommandHandler _removeAddressCommandHandler;

        public AddressController(
            GetAddressQueryHandler getAddressQueryHandler,
            GetAddressByIdQueryHandler getAddressByIdQueryHandler,
            GetAddressByUserIdQueryHandler getAddressByUserIdQueryHandler,
            CreateAddressCommandHandler createAddressCommandHandler,
            UpdateAddressCommandHandler updateAddressCommandHandler,
            RemoveAddressCommandHandler removeAddressCommandHandler
        )
        {
            _getAddressQueryHandler = getAddressQueryHandler;
            _getAddressByIdQueryHandler = getAddressByIdQueryHandler;
            _getAddressByUserIdQueryHandler = getAddressByUserIdQueryHandler;
            _createAddressCommandHandler = createAddressCommandHandler;
            _updateAddressCommandHandler = updateAddressCommandHandler;
            _removeAddressCommandHandler = removeAddressCommandHandler;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllAddresses()
        {
            var values = await _getAddressQueryHandler.Handle();
            return Ok(values);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAddressById(int id)
        {
            var values = await _getAddressByIdQueryHandler.Handle(new GetAddressByIdQuery{ AddressId = id });
            if (values == null)
            {
                return NotFound("Adres bulunamadi.");
            }
            return Ok(values);
        }

        [Authorize]
        [HttpGet("userId/{userId}")]
        public async Task<IActionResult> GetAddressByUserId(string userId)
        {
            var value = await _getAddressByUserIdQueryHandler.Handle(new GetAddressByUserIdQuery{ UserId = userId });
            if (value == null)
            {
                return NotFound("Adres bulunamadi.");
            }
            return Ok(value);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateAddress(CreateAddressCommand command)
        {
            await _createAddressCommandHandler.Handle(command);
            return Ok("Adres bilgisi basariyla eklendi.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> UpdateAddress(UpdateAddressCommand command)
        {
            await _updateAddressCommandHandler.Handle(command);
            return Ok("Adres bilgisi basariyla guncellendi.");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public async Task<IActionResult> RemoveAddress(int id)
        {
            await _removeAddressCommandHandler.Handle(new RemoveAddressCommand{ AddressId = id });
            return Ok("Adres basariyla silindi.");
        }
    }
}