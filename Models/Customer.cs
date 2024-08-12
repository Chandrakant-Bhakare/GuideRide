namespace GuideRide.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public ICollection<Booking> Bookings { get; set; }
    }
}
