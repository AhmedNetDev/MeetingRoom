using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MeetingRoom.Api.Data;
using MeetingRoom.Api.Dtos;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MeetingRoom.Api.Controllers
{
    [ApiController]
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class MeetingRoomsController : ControllerBase
    {
        private readonly ILogger<MeetingRoomsController> _logger;
        private readonly IMapper _mapper;
        private readonly IMeetingRoomRepo _repository;

        public MeetingRoomsController(ILogger<MeetingRoomsController> logger, IMapper mapper, IMeetingRoomRepo repository)
        {
            _logger = logger;
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<MeetingRoomDto>> GetAllMeetingRooms()
        {
            var meetingRooms = _repository.GetMeetingRooms();

            return Ok(_mapper.Map<IEnumerable<MeetingRoomDto>>(meetingRooms));
        }

        [HttpGet("{id}", Name = "GetMeetingRoomById")]
        public ActionResult<MeetingRoomDto> GetMeetingRoomById(int id)
        {
            var meetingRoom = _repository.GetMeetingRoomById(id);
            if (meetingRoom != null)
            {
                return Ok(_mapper.Map<MeetingRoomDto>(meetingRoom));
            }
            return NotFound();
        }
    }
}
