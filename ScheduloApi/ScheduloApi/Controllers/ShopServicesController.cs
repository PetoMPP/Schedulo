using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScheduloApi.Data;
using ScheduloApi.Models;

namespace ScheduloApi.Controllers
{
    [Route("shop-services")]
    [ApiController]
    public class ShopServicesController : Controller
    {
        private readonly ApiContext _context;

        public ShopServicesController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var shopServiceModel = await _context.ShopServiceModel.FindAsync(id);
            if (shopServiceModel == null)
            {
                return NotFound();
            }

            return Ok(shopServiceModel);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody]ShopServiceModel shopServiceModel)
        {
            await _context.ShopServiceModel.AddAsync(shopServiceModel);
            return Ok(shopServiceModel);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] ShopServiceModel shopServiceModel)
        {
            if (!_context.ShopServiceModel.Any(s => s.Id == id))
            {
                return NotFound();
            }

            shopServiceModel.Id = id;
            _context.ShopServiceModel.Update(shopServiceModel);
            await _context.SaveChangesAsync();
            await _context.Entry(shopServiceModel).ReloadAsync();
            return Ok(shopServiceModel);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var shopServiceModel = await _context.ShopServiceModel.FindAsync(id);
            if (shopServiceModel == null)
            {
                return NotFound();
            }

            _context.ShopServiceModel.Remove(shopServiceModel);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
