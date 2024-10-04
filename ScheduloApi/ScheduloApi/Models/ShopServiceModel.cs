using System.ComponentModel.DataAnnotations;

namespace ScheduloApi.Models
{
    public class ShopServiceModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public TimeSpan Duration { get; set; }
        public int ShopModelId { get; set; }
    }
}