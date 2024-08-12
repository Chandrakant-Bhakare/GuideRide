using GuideRide.Models;
using System;

public class Booking
{
    public int Id { get; set; }

    public int CustomerId { get; set; }
    public User Customer { get; set; }

    public int GuideId { get; set; }
    public Guide Guide { get; set; }

    public int CarId { get; set; }
    public Car Car { get; set; }

    public DateTime Date { get; set; }
    public decimal TotalAmount { get; set; }
}
