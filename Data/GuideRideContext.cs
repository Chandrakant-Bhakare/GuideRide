namespace GuideRide.Data;
using Microsoft.EntityFrameworkCore;
using GuideRide.Models;


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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Customer)
            .WithMany()
            .HasForeignKey(b => b.CustomerId);

        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Guide)
            .WithMany()
            .HasForeignKey(b => b.GuideId);

        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Car)
            .WithMany()
            .HasForeignKey(b => b.CarId);
    }
}
