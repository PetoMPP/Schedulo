using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScheduloApi.Data;
using ScheduloApi.Models;

namespace ScheduloApi.Controllers
{
    [Route("shops")]
    [ApiController]
    public class ShopsController : Controller
    {
        private readonly ApiContext _context;

        public ShopsController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(bool withServices)
        {
            IQueryable<ShopModel> query = _context.ShopModel;
            if (withServices)
            {
                query = query.Include(s => s.Services);
            }
            return Ok(await query.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id, bool withServices)
        {
            IQueryable<ShopModel> query = _context.ShopModel;
            if (withServices)
            {
                query = query.Include(s => s.Services);
            }

            var shopModel = await query.FirstOrDefaultAsync(s => s.Id == id);
            if (shopModel == null)
            {
                return NotFound();
            }
            return base.Ok(shopModel);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ShopModel shopModel)
        {
            _context.Add(shopModel);
            await _context.SaveChangesAsync();
            return Ok(shopModel);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var shopModel = await _context.ShopModel.FindAsync(id);
            if (shopModel != null)
            {
                _context.ShopModel.Remove(shopModel);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
