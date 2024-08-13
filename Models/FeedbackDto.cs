namespace GuideRide.Models.GuideRide.Dtos
{
    public class FeedbackDto
    {
        public int BookingId { get; set; }
        public int GuideRating { get; set; } // Rating for the guide
        public int CarRating { get; set; } // Rating for the car
        public string Comments { get; set; } // Optional comments
    }
}
