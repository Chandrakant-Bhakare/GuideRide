using GuideRide.Data;
using GuideRide.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Linq;

[ApiController]
[Route("api/admin/[controller]")]
[Authorize(Policy = "AdminOnly")]
public class AdminController : ControllerBase
{
    private readonly GuideRideContext _context;
    private readonly ILogger<AdminController> _logger;

    public AdminController(GuideRideContext context, ILogger<AdminController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // **Guide CRUD Operations**

    [HttpPost("guides")]
    public async Task<IActionResult> CreateGuide([FromBody] Guide guide)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            _context.Guides.Add(guide);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetGuideById), new { id = guide.Id }, guide);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while creating a guide.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating the guide.");
        }
    }

    [HttpGet("guides/{id}")]
    public async Task<IActionResult> GetGuideById(int id)
    {
        var guide = await _context.Guides.FindAsync(id);

        if (guide == null)
        {
            return NotFound();
        }

        return Ok(guide);
    }

    [HttpGet("guides")]
    public async Task<IActionResult> GetAllGuides()
    {
        var guides = await _context.Guides.ToListAsync();
        return Ok(guides);
    }

    [HttpPut("guides/{id}")]
    public async Task<IActionResult> UpdateGuide(int id, [FromBody] Guide guide)
    {
        if (id != guide.Id)
        {
            return BadRequest();
        }

        try
        {
            _context.Entry(guide).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!GuideExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while updating the guide.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating the guide.");
        }
    }

    [HttpDelete("guides/{id}")]
    public async Task<IActionResult> DeleteGuide(int id)
    {
        var guide = await _context.Guides.FindAsync(id);
        if (guide == null)
        {
            return NotFound();
        }

        try
        {
            _context.Guides.Remove(guide);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while deleting the guide.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting the guide.");
        }
    }

    private bool GuideExists(int id)
    {
        return _context.Guides.Any(e => e.Id == id);
    }

    // **Car CRUD Operations**

    [HttpPost("cars")]
    public async Task<IActionResult> CreateCar([FromBody] Car car)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCarById), new { id = car.Id }, car);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while creating a car.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating the car.");
        }
    }

    [HttpGet("cars/{id}")]
    public async Task<IActionResult> GetCarById(int id)
    {
        var car = await _context.Cars.FindAsync(id);

        if (car == null)
        {
            return NotFound();
        }

        return Ok(car);
    }

    [HttpGet("cars")]
    public async Task<IActionResult> GetAllCars()
    {
        var cars = await _context.Cars.ToListAsync();
        return Ok(cars);
    }

    [HttpPut("cars/{id}")]
    public async Task<IActionResult> UpdateCar(int id, [FromBody] Car car)
    {
        if (id != car.Id)
        {
            return BadRequest();
        }

        try
        {
            _context.Entry(car).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CarExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while updating the car.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating the car.");
        }
    }

    [HttpDelete("cars/{id}")]
    public async Task<IActionResult> DeleteCar(int id)
    {
        var car = await _context.Cars.FindAsync(id);
        if (car == null)
        {
            return NotFound();
        }

        try
        {
            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while deleting the car.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while deleting the car.");
        }
    }

    private bool CarExists(int id)
    {
        return _context.Cars.Any(e => e.Id == id);
    }
}
