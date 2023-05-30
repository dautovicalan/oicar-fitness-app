using AutoMapper;
using Domain.ErrorModel;
using Domain.Model;
using FitPal_Models.Dto;
using FitPal_Models.JsonModels;
using Microsoft.AspNetCore.Mvc;
using Repository;

namespace oicar_ApiServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPreferencesController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public UserPreferencesController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("GetUserPreferences")]
        public async Task<IActionResult> GetUserPreferences(int id)
        {
            var userPref = await _repository.UserPreferences.GetUserPreferences(id);
            if (userPref is null)
                return NotFound();

            return Ok(_mapper.Map<UserPreferencesDto>(userPref));
        }

        [HttpPost("Exist")]
        public async Task<IActionResult> IsUserPreferencesExist(int id)
        {
            bool exist = await _repository.UserPreferences.UserHasPreferences(id);

            return Ok(exist);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUserPreferences(UserPreferencesInput input)
        {
            try
            {
                UserPreferences newUserPreferences = await _repository.UserPreferences.RegisterUserPreferences(input);

                return Ok(_mapper.Map<UserPreferencesDto>(newUserPreferences));
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateUserPreferences(UserPreferencesInput input)
        {
            var userPref = await _repository.UserPreferences.GetUserPreferences(input.UserId);

            if (userPref is null)
                return NotFound(new HttpError("User not found"));

            userPref.Weight = input.Weight;
            userPref.Height = input.Height;
            userPref.Goal = input.Goal;
            userPref.Newsletter = input.Newsletter;
            userPref.WorkoutNumberPerWeek = input.WorkoutNumberPerWeek;


            await _repository.UserPreferences.UpdateUserPreferences(userPref);
            return Ok();

        }
    }
}