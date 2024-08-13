namespace GuideRide.Models.GuideRide.Dtos
{
    public class BookingDto
    {
        public int CarId { get; set; }
        public int GuideId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
