using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingRoom.Api.Data
{
    public class InMemoryMeetingRoomRepo : IMeetingRoomRepo
    {
        private readonly MeetingContext _context;

        public InMemoryMeetingRoomRepo(MeetingContext context)
        {
            _context = context;
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }

        public IEnumerable<Models.MeetingRoom> GetMeetingRooms()
        {
            return _context.MeetingRoom.ToList();
        }

        public Models.MeetingRoom GetMeetingRoomById(int id)
        {
            return _context.MeetingRoom.FirstOrDefault(t => t.Id == id);
        }
    }
}
