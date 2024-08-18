using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GuideRide.Data;
using GuideRide.Models;
using System.Threading.Tasks;

namespace GuideRide.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QueryController : ControllerBase
    {
        private readonly GuideRideContext _context;

        public QueryController(GuideRideContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateQuery([FromBody] Query query)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Queries.Add(query);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Query submitted successfully" });
        }

        [HttpGet]
        public async Task<IActionResult> GetQueries()
        {
            var queries = await _context.Queries.ToListAsync();
            return Ok(queries);
        }
    }
}
