namespace GuideRide.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int CarId { get; set; }
        public int GuideId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int NumberOfDays { get; set; }
        public decimal TotalAmount { get; set; }

        // Navigation properties
        public User Customer { get; set; }
        public Car Car { get; set; }
        public Guide Guide { get; set; }

        // New relationship with Feedback
        public Feedback Feedback { get; set; }
    }
}
