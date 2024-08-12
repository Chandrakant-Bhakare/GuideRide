using GuideRide.Data;
using GuideRide.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/admin/[controller]")]
[Authorize(Policy = "AdminOnly")]
public class AdminController : ControllerBase
{
    private readonly GuideRideContext _context;

    public AdminController(GuideRideContext context)
    {
        _context = context;
    }

    // **Guide CRUD Operations**

    [HttpPost("guides")]
    public async Task<IActionResult> CreateGuide([FromBody] Guide guide)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Guides.Add(guide);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetGuideById), new { id = guide.Id }, guide);
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

        _context.Entry(guide).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
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

        return NoContent();
    }

    [HttpDelete("guides/{id}")]
    public async Task<IActionResult> DeleteGuide(int id)
    {
        var guide = await _context.Guides.FindAsync(id);
        if (guide == null)
        {
            return NotFound();
        }

        _context.Guides.Remove(guide);
        await _context.SaveChangesAsync();

        return NoContent();
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

        _context.Cars.Add(car);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCarById), new { id = car.Id }, car);
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

        _context.Entry(car).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
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

        return NoContent();
    }

    [HttpDelete("cars/{id}")]
    public async Task<IActionResult> DeleteCar(int id)
    {
        var car = await _context.Cars.FindAsync(id);
        if (car == null)
        {
            return NotFound();
        }

        _context.Cars.Remove(car);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CarExists(int id)
    {
        return _context.Cars.Any(e => e.Id == id);
    }
}
