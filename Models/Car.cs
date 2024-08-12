namespace GuideRide.Models
{
    public class Car
    {
        public int Id { get; set; }

        public string ModelName { get; set; }
        public string RegistrationNumber { get; set; }
        public string Type { get; set; }

        // Add Fare property
        public decimal Fare { get; set; }

        // Add Status property with default value true
        public bool Status { get; set; } = true;
    }
}
