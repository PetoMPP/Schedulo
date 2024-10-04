using System.ComponentModel.DataAnnotations;

namespace ScheduloApi.Models
{
    public class Shop
    {
        [Key]
        public Guid Id { get; internal set; }
        public string Name { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public string? Summary { get; set; }
        public string? Description { get; set; }
        [DataType(DataType.Date)]
        public DateTime JoinDate { get; internal set; } = DateTime.Now;
        public List<ShopService>? Services { get; internal set; }
    }
}
