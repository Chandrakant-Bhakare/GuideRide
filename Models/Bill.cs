namespace GuideRide.Models;

public class Bill
{
    public int Id { get; set; }
    public int BookingId { get; set; }
    public Booking Booking { get; set; }
    public decimal Amount { get; set; }
}
