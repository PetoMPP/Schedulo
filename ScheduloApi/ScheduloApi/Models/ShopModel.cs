using System.ComponentModel.DataAnnotations;

namespace ScheduloApi.Models
{
    public class ShopModel
    {
        [Key]
        public int Id { get; internal set; }
        public string Name { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public string? Summary { get; set; }
        public string? Description { get; set; }
        [DataType(DataType.Date)]
        public DateTime JoinDate { get; internal set; } = DateTime.Now;
        public List<ShopServiceModel> Services { get; internal set; } = null!;
    }
}
