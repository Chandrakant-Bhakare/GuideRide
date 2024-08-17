namespace GuideRide.Models
{
    public class Feedback
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public Booking Booking { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int GuideRating { get; set; } 
        public int CarRating { get; set; } 
        public string Comments { get; set; }
        public DateTime DateSubmitted { get; set; }
    }
}
