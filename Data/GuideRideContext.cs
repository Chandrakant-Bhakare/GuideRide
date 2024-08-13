using GuideRide.Models;
using Microsoft.EntityFrameworkCore;

namespace GuideRide.Data
{
    public class GuideRideContext : DbContext
    {
        public GuideRideContext(DbContextOptions<GuideRideContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Guide> Guides { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Query> Queries { get; set; } // Add DbSet for Query

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure relationships and constraints for Booking
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Customer)
                .WithMany() // You may want to specify a navigation property on User if it exists
                .HasForeignKey(b => b.CustomerId)
                .OnDelete(DeleteBehavior.Restrict); // Adjust behavior as needed

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Guide)
                .WithMany() // You may want to specify a navigation property on Guide if it exists
                .HasForeignKey(b => b.GuideId)
                .OnDelete(DeleteBehavior.Restrict); // Adjust behavior as needed

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Car)
                .WithMany() // You may want to specify a navigation property on Car if it exists
                .HasForeignKey(b => b.CarId)
                .OnDelete(DeleteBehavior.Restrict); // Adjust behavior as needed

            // Configure relationships and constraints for Feedback
            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.Booking)
                .WithOne(b => b.Feedback) // Assuming a Booking has one Feedback
                .HasForeignKey<Feedback>(f => f.BookingId)
                .OnDelete(DeleteBehavior.Cascade); // Adjust as needed

            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.User)
                .WithMany() // Specify navigation property if User has a collection of Feedbacks
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Adjust as needed

            // Configure unique constraints or indexes if needed
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Car>()
                .HasIndex(c => c.RegistrationNumber)
                .IsUnique();

            // Add unique constraints for Query if needed
        }
    }
}
