using System;
using System.ComponentModel.DataAnnotations;

public class User
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string PasswordHash { get; set; } // Store hashed password

    public string Role { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Address { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime? DateOfBirth { get; set; }
   
}
