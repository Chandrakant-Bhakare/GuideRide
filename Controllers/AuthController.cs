using GuideRide.Data;
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
                .FirstOrDefaultAsync(u => u.Username == loginRequest.Username);

            if (user == null || !_authService.VerifyPassword(user.PasswordHash, loginRequest.Password))
            {
                return Unauthorized();
            }

            var token = _authService.GenerateToken(user);

            return Ok(new { Token = token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest registerRequest)
        {
            if (await _context.Users.AnyAsync(u => u.Username == registerRequest.Username))
            {
                return Conflict("Username already exists");
            }

            var user = new User
            {
                Username = registerRequest.Username,
                PasswordHash = _authService.HashPassword(registerRequest.Password),
                Role = registerRequest.Role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class RegisterRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
