using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScheduloApi.Data;
using ScheduloApi.Extensions;
using ScheduloApi.Models;

namespace ScheduloApi.Controllers
{
    [Route("shops")]
    [ApiController]
    public class ShopsController : Controller
    {
        private readonly ApiContext _context;
        private readonly IMapper _mapper;

        public ShopsController(ApiContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(bool withServices)
        {
            IQueryable<Shop> query = _context.Shops;
            if (withServices)
            {
                query = query.Include(s => s.Services);
            }
            return Ok(await query.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id, bool withServices)
        {
            IQueryable<Shop> query = _context.Shops;
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

        [HttpGet("owned")]
        [Authorize]
        public async Task<IActionResult> GetOwned()
        {
            var userId = User.GetUserId()!;
            var shops = await _context.Shops.Where(s => s.OwnerId == userId).ToListAsync();
            return Ok(shops);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] ShopDto shopDto)
        {
            var shopModel = _mapper.Map<Shop>(shopDto);
            shopModel.OwnerId = User.GetUserId()!;
            _context.Shops.Add(shopModel);
            await _context.SaveChangesAsync();
            return Ok(shopModel);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(Guid id, [FromBody] ShopDto shopDto)
        {
            if (await _context.Shops.FirstOrDefaultAsync(s => s.Id == id) is not { } shopModel)
            {
                return NotFound();
            }

            _mapper.Map(shopDto, shopModel);
            if (shopModel.OwnerId != User.GetUserId())
            {
                return Unauthorized();
            }

            _context.Shops.Update(shopModel);
            await _context.SaveChangesAsync();
            return Ok(shopModel);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            var shopModel = await _context.Shops.FindAsync(id);
            if (shopModel == null)
            {
                return NotFound();
            }

            if (shopModel.OwnerId != User.GetUserId())
            {
                return Unauthorized();
            }

            _context.Shops.Remove(shopModel);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
