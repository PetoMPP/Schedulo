using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ScheduloApi.Models;

namespace ScheduloApi.Data
{
    public class ApiContext : IdentityDbContext<IdentityUser<Guid>, IdentityRole<Guid>, Guid>
    {
        public ApiContext(DbContextOptions<ApiContext> options)
            : base(options)
        {
        }

        public DbSet<BusinessUser> BusinessUsers { get; set; } = default!;
        public DbSet<Shop> Shops { get; set; } = default!;
        public DbSet<ShopService> ShopServices { get; set; } = default!;
    }
}
