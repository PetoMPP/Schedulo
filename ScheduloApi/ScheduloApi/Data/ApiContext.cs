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

        public DbSet<Shop> Shops { get; set; } = default!;
        public DbSet<ShopService> ShopServices { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HandleShopServiceCreating();
        }
    }
}
