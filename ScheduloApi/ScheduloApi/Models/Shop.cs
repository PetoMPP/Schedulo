using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        [JsonIgnore]
        public Guid OwnerId { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(OwnerId))]
        public BusinessUser Owner { get; set; } = null!;
    }

    public record struct ShopDto(string Name, string? ImageUrl, string? Summary, string? Description);
}