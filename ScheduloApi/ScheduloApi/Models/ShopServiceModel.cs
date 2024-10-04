using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations;

namespace ScheduloApi.Models
{
    public class ShopServiceModel
    {
        [Key]
        public int Id { get; internal set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public TimeSpan Duration { get; set; }
        public int ShopModelId { get; set; }
    }

    public static class ShopServiceModelExtensions
    {
        public static void HandleShopServiceModelCreating(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ShopServiceModel>()
                .Property(s => s.ShopModelId)
                .ValueGeneratedOnAdd()
                .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
        }
    }
}