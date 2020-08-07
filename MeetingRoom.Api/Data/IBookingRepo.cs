using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingRoom.Api.Models;

namespace MeetingRoom.Api.Data
{
    public interface IBookingRepo
    {
        bool SaveChanges();

        IEnumerable<Booking> GetAllBookings();
        Booking GetBookingById(int id);
        void CreateBooking(Booking booking);
        void DeleteBooking(Booking booking);
    }
}
