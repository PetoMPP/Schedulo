using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetAsync(Guid id)
        {
            var shopServiceModel = await _context.ShopServices.FindAsync(id);
            if (shopServiceModel == null)
            {
                return NotFound();
            }

            return Ok(shopServiceModel);
        }

        [HttpPost]
        [AuthorizeBusinessUser]
        public async Task<IActionResult> CreateAsync([FromBody]ShopService shopServiceModel)
        {
            _context.ShopServices.Add(shopServiceModel);
            await _context.SaveChangesAsync();
            return Ok(shopServiceModel);
        }

        [HttpPut("{id:guid}")]
        [AuthorizeBusinessUser]
        public async Task<IActionResult> UpdateAsync(Guid id, [FromBody] ShopService shopServiceModel)
        {
            if (!_context.ShopServices.Any(s => s.Id == id))
            {
                return NotFound();
            }

            shopServiceModel.Id = id;
            _context.ShopServices.Update(shopServiceModel);
            await _context.SaveChangesAsync();
            await _context.Entry(shopServiceModel).ReloadAsync();
            return Ok(shopServiceModel);
        }

        [HttpDelete("{id:guid}")]
        [AuthorizeBusinessUser]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var shopServiceModel = await _context.ShopServices.FindAsync(id);
            if (shopServiceModel == null)
            {
                return NotFound();
            }

            _context.ShopServices.Remove(shopServiceModel);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
