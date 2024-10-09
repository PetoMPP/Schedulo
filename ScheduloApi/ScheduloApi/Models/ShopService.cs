using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;

namespace ScheduloApi.Models
{
    [EntityTypeConfiguration(typeof(ShopServiceTypeConfiguration))]
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

    public class ShopServiceTypeConfiguration : IEntityTypeConfiguration<ShopService>
    {
        public void Configure(EntityTypeBuilder<ShopService> builder)
        {
            builder
                .Property(s => s.ShopId)
                .ValueGeneratedOnAdd()
                .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
        }
    }
}