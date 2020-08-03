using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeetingRoom.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace MeetingRoom.Api.Data
{
    public class MeetingContext : DbContext
    {
        public MeetingContext(DbContextOptions options) : base(options) {}

        public DbSet<Models.MeetingRoom> MeetingRoom { get; set; }
        public DbSet<Booking> Booking { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>()
                .HasIndex(p => new { p.Date, p.Name, p.Start, p.End })
                .IsUnique();

            modelBuilder.Entity<Booking>()
                .HasOne(e => e.MeetingRoom)
                .WithMany(c => c.Bookings);
        }
    }
}
