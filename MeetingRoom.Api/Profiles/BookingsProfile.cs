using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MeetingRoom.Api.Dtos;

namespace MeetingRoom.Api.Profiles
{
    public class BookingsProfile : Profile
    {
        public BookingsProfile()
        {
            CreateMap<Models.Booking, BookingDto>();
            CreateMap<BookingDto,Models.Booking>();
        }
    }
}
