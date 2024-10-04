using Microsoft.AspNetCore.Mvc;
using ScheduloApi.Data;

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

        [HttpGet]
        public async Task<IActionResult> GetAsync(int id)
        {
            var shopServiceModel = await _context.ShopServiceModel.FindAsync(id);
            if (shopServiceModel == null)
            {
                return NotFound();
            }

            return Ok(shopServiceModel);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var shopServiceModel = await _context.ShopServiceModel.FindAsync(id);
            if (shopServiceModel != null)
            {
                _context.ShopServiceModel.Remove(shopServiceModel);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
