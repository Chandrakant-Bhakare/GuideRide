using GuideRide.Data;
using GuideRide.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GuideRide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly GuideRideContext _context;
        private readonly AuthService _authService;

        public AuthController(GuideRideContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            if (user == null || !_authService.VerifyPassword(user.PasswordHash, loginRequest.Password))
            {
                return Unauthorized();
            }

            var token = _authService.GenerateToken(user);

            // Include the user role in the response
            var response = new
            {
                Token = token,
                Role = user.Role
            };

            return Ok(response);
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest registerRequest)
        {
            if (await _context.Users.AnyAsync(u => u.Email == registerRequest.Email))
            {
                return Conflict("Email already exists");
            }

            var user = new User
            {
                Name = registerRequest.Name,
                Email = registerRequest.Email,
                PasswordHash = _authService.HashPassword(registerRequest.Password),
                Role = registerRequest.Role,
                Address = registerRequest.Address,
                DateOfBirth = registerRequest.DateOfBirth
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string? Address { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
