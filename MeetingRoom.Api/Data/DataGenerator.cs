using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace MeetingRoom.Api.Data
{
    public class DataGenerator
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = new MeetingContext(
                serviceProvider.GetRequiredService<DbContextOptions<MeetingContext>>());
            // Look for any meeting room.
            if (context.MeetingRoom.Any())
            {
                return;   // Data was already seeded
            }

            context.MeetingRoom.AddRange(
                new Models.MeetingRoom
                {
                    Id = 1,
                    Name = "MeetingRoom1",
                    Description = "Meeting room number 1"
                },
                new Models.MeetingRoom
                {
                    Id = 2,
                    Name = "MeetingRoom2",
                    Description = "Meeting room number 2"
                },
                new Models.MeetingRoom
                {
                    Id = 3,
                    Name = "MeetingRoom3",
                    Description = "Meeting room number 3"
                },
                new Models.MeetingRoom
                {
                    Id = 4,
                    Name = "MeetingRoom4",
                    Description = "Meeting room number 4"
                },
                new Models.MeetingRoom
                {
                    Id = 5,
                    Name = "MeetingRoom5",
                    Description = "Meeting room number 5"
                },
                new Models.MeetingRoom
                {
                    Id = 6,
                    Name = "MeetingRoom6",
                    Description = "Meeting room number 6"
                },
                new Models.MeetingRoom
                {
                    Id = 7,
                    Name = "MeetingRoom7",
                    Description = "Meeting room number 7"
                },
                new Models.MeetingRoom
                {
                    Id = 8,
                    Name = "MeetingRoom8",
                    Description = "Meeting room number 8"
                },
                new Models.MeetingRoom
                {
                    Id = 9,
                    Name = "MeetingRoom9",
                    Description = "Meeting room number 9"
                },
                new Models.MeetingRoom
                {
                    Id = 10,
                    Name = "MeetingRoom10",
                    Description = "Meeting room number 10"
                });

            context.SaveChanges();
        }
    }
}
