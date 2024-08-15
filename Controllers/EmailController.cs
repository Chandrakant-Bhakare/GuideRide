using GuideRide.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class EmailController : ControllerBase
{
    private readonly EmailService _emailService;

    public EmailController(EmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost("send-confirmation-email")]
    public async Task<IActionResult> SendConfirmationEmail([FromBody] EmailDto emailDto)
    {
        await _emailService.SendEmailAsync(emailDto.Email, "Registration Successful", "Thank you for registering with us.");
        return Ok(new { message = "Confirmation email sent." });
    }
}

public class EmailDto
{
    public string Email { get; set; }
}
