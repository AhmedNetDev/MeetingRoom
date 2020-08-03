using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingRoom.Api.Models;

namespace MeetingRoom.Api.Data
{
    public interface IMeetingRoomRepo
    {
        bool SaveChanges();

        IEnumerable<Models.MeetingRoom> GetMeetingRooms();
        Models.MeetingRoom GetMeetingRoomById(int id);
    }
}
