namespace GuideRide.Models
{
    public class Car
    {
        public int Id { get; set; }

        public string ModelName { get; set; }
        public string RegistrationNumber { get; set; }
        public string Type { get; set; }

        public decimal Fare { get; set; }
        public bool Status { get; set; } = true;
    }
}
