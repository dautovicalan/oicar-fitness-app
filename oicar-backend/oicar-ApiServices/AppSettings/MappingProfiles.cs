using AutoMapper;
using Domain.Models;
using FitPal_Models.Dto;

namespace oicar_ApiServices.AppSettings
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
