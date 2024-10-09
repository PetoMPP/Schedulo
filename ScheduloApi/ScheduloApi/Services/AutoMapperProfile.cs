using AutoMapper;
using ScheduloApi.Models;

namespace ScheduloApi.Services
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ShopDto, Shop>();
            CreateMap<BusinessUserRegisterDto, BusinessUser>();
        }
    }
}
