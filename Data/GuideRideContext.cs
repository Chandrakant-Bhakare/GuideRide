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
            
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Customer)
                .WithMany() 
                .HasForeignKey(b => b.CustomerId)
                .OnDelete(DeleteBehavior.Restrict); 

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Guide)
                .WithMany() 
                .HasForeignKey(b => b.GuideId)
                .OnDelete(DeleteBehavior.Restrict); 

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Car)
                .WithMany() 
                .HasForeignKey(b => b.CarId)
                .OnDelete(DeleteBehavior.Restrict); 

            
            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.Booking)
                .WithOne(b => b.Feedback) 
                .HasForeignKey<Feedback>(f => f.BookingId)
                .OnDelete(DeleteBehavior.Cascade); 

            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.User)
                .WithMany() 
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Restrict); 

            
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Car>()
                .HasIndex(c => c.RegistrationNumber)
                .IsUnique();

            
        }
    }
}
