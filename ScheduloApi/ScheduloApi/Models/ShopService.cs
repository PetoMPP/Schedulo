using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations;

namespace ScheduloApi.Models
{
    public class ShopService
    {
        [Key]
        public Guid Id { get; internal set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public TimeSpan Duration { get; set; }
        public Guid ShopId { get; set; }
    }

    public static class ShopServiceModelExtensions
    {
        public static void HandleShopServiceCreating(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ShopService>()
                .Property(s => s.ShopId)
                .ValueGeneratedOnAdd()
                .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
        }
    }
}