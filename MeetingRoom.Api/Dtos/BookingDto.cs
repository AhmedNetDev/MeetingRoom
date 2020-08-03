using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingRoom.Api.Dtos
{
    public class BookingDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public int MeetingRoomId { get; set; }
    }
}
