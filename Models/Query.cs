namespace GuideRide.Models
{
    
        public class Query
        {
            public int Id { get; set; }
            public string Name { get; set; } // Optional, for user's name
            public string Email { get; set; } // Optional, for user's email
            public string Subject { get; set; }
            public string Message { get; set; }
            public DateTime DateSubmitted { get; set; }
        }
    }

