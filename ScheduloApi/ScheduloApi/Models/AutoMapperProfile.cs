using AutoMapper;

namespace ScheduloApi.Models
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ShopDto, Shop>();
        }
    }
}
