using AutoMapper;
using Domain.Model;
using Domain.Models;
using FitPal_Models.Dto;
using FitPal_Models.JsonModels;

namespace oicar_ApiServices.AppSettings
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<UserPreferences, UserPreferencesDto>();
            CreateMap<UserPreferences, UserPreferencesDto>();
            CreateMap<CustomWorkout, CustomWorkoutInput>().ReverseMap();
            CreateMap<Exercise, ExercisesDto>().ReverseMap();
            CreateMap<CustomWorkout, WorkoutDto>();
            CreateMap<ExerciseProgress, ExerciseProgressInput>().ReverseMap();
        }
    }
}
