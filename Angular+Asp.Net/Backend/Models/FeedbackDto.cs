namespace GuideRide.Models.GuideRide.Dtos
{
    public class FeedbackDto
    {
        public int BookingId { get; set; }
        public int GuideRating { get; set; } 
        public int CarRating { get; set; } 
        public string Comments { get; set; } 
    }
}
