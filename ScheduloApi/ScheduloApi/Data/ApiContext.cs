using Microsoft.EntityFrameworkCore;
using ScheduloApi.Models;

namespace ScheduloApi.Data
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options)
            : base(options)
        {
        }

        public DbSet<ShopModel> ShopModel { get; set; } = default!;
        public DbSet<ShopServiceModel> ShopServiceModel { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HandleShopServiceModelCreating();
        }
    }
}
