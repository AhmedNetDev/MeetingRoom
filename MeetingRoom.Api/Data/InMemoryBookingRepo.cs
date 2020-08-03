using MeetingRoom.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingRoom.Api.Data
{
    public class InMemoryBookingRepo : IBookingRepo
    {
        private readonly MeetingContext _context;

        public InMemoryBookingRepo(MeetingContext context)
        {
            _context = context;
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }

        public void CreateBooking(Booking booking)
        {
            if (booking == null)
            {
                throw new ArgumentNullException(nameof(booking));
            }

            _context.Booking.Add(booking);
        }

        public void DeleteBooking(Booking booking)
        {
            if (booking == null)
            {
                throw new ArgumentNullException(nameof(booking));
            }

            _context.Booking.Remove(booking);
        }

        public IEnumerable<Booking> GetAllBookings()
        {
            return _context.Booking.ToList();
        }

        public Booking GetBookingById(int id)
        {
            return _context.Booking.FirstOrDefault(t => t.Id == id);
        }
    }
}
