using AutoMapper;
using Domain.ErrorModel;
using Domain.Model;
using FitPal_Models.Dto;
using FitPal_Models.JsonModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository;

namespace oicar_ApiServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class CustomWorkoutController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public CustomWorkoutController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateCustomWorkout(CustomWorkoutInput input)
        {
            CustomWorkout customWorkout = _mapper.Map<CustomWorkout>(input);
            int workoutId = await _repository.CustomWorkout.CreateWorkout(customWorkout);

            return Ok(workoutId);
        }


        [HttpGet("GetWorkouts")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllUsersWorkouts(int idUser)
        {
            List<CustomWorkout> workoutsList = await _repository.CustomWorkout.GetUserCustomWorkouts(idUser);
            return Ok(workoutsList);
        }
        [HttpGet("GetWorkout")]
        public async Task<IActionResult> GetUserWorkout(int idUser, int idWorkout)
        {
            CustomWorkout? workout = await _repository.CustomWorkout.GetUserCustomWorkout(idUser, idWorkout);
            if (workout is null)
                return NotFound();

            return Ok(_mapper.Map<WorkoutDto>(workout));
        }
        [HttpPost("AddExercises")]
        public async Task<IActionResult> AddExercisesToWorkout(int idWorkout, List<int> exerciseIds)
        {
            await _repository.CustomWorkout.AddExercises(idWorkout, exerciseIds);

            return Ok();
        }

        [HttpGet("ByDate")]
        public async Task<IActionResult> GetWorkoutByDate(int idUser, string date)
        {
            var workoutSchedule = await _repository.CustomWorkout.GetWorkoutsByDate(idUser, date);
            if (workoutSchedule is null)
                return NotFound();

            return Ok(workoutSchedule.Id);
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteWorkout(int idUser, int idWorkout)
        {
            CustomWorkout? workout = await _repository.CustomWorkout.GetUserCustomWorkout(idUser,idWorkout);

            if (workout is null)
                return NotFound();

            await _repository.CustomWorkout.DeleteWorkout(workout);
            return Ok();
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateWorkout(UpdateWorkoutInput input)
        {
            CustomWorkout? workout = await _repository.CustomWorkout.GetUserCustomWorkout(input.idUser, input.idWorkout);

            if (workout == null)
                return NotFound(new HttpError("Workout doesn't exist"));

            workout.Name = input.Name;
            await _repository.CustomWorkout.UpdateWorkout(workout);

            return Ok();
        }

    }
}