using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MeetingRoom.Api.Data;
using MeetingRoom.Api.Dtos;
using MeetingRoom.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MeetingRoom.Api.Controllers
{
    [ApiController]
    [EnableCors("CorsPolicy")]
    [Authorize]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        public readonly IMapper _mapper;
        private readonly IBookingRepo _repository;
        private readonly ILogger<BookingsController> _logger;

        public BookingsController(ILogger<BookingsController> logger, IMapper mapper, IBookingRepo repository)
        {
            _mapper = mapper;
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<BookingDto>> GetAllBookings()
        {
            var bookings = _repository.GetAllBookings();

            return Ok(_mapper.Map<IEnumerable<BookingDto>>(bookings));
        }

        [HttpGet("{id}", Name = "GetBookingById")]
        public ActionResult<BookingDto> GetBookingById(int id)
        {
            var booking = _repository.GetBookingById(id);
            if (booking != null)
            {
                return Ok(_mapper.Map<BookingDto>(booking));
            }
            return NotFound();
        }

        [HttpPost]
        public ActionResult<BookingDto> CreateBooking([FromBody] BookingDto bookingCreateDto)
        {
            var bookingModel = _mapper.Map<Booking>(bookingCreateDto);
            _repository.CreateBooking(bookingModel);
            _repository.SaveChanges();

            var bookingDto = _mapper.Map<BookingDto>(bookingModel);

            return CreatedAtRoute(nameof(GetBookingById), new { bookingDto.Id }, bookingDto);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteBooking(int id)
        {
            var bookingModel = _repository.GetBookingById(id);

            if (bookingModel == null)
            {
                return NotFound();
            }

            _repository.DeleteBooking(bookingModel);
            _repository.SaveChanges();

            return NoContent();
        }
    }
}
