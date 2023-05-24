using AutoMapper;
using Domain.Model;
using FitPal_Models.Dto;
using FitPal_Models.JsonModels;
using Microsoft.AspNetCore.Mvc;
using Repository;

namespace oicar_ApiServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public ExerciseController(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllExercises()
        {
            var exercies = await _repositoryManager.Exercise.GetAllExerciseAsync();

            return Ok(exercies);
        }

        [HttpGet("GetByBodyPart")]
        public async Task<IActionResult> GetAllExercisesByBodyPart(int bodyPartId)
        {
            var exercies = await _repositoryManager.Exercise.GetExerciseByBodyPart(bodyPartId);

            return Ok(exercies);
        }        

        [HttpGet("CreateProgress")]
        public async Task<IActionResult> CreateExerciseProgress(ExerciseProgressInput input)
        {
            ExerciseProgress exerciseProgress = _mapper.Map<ExerciseProgress>(input);

            await _repositoryManager.ExerciseProgress.CreateExerciseProgress(exerciseProgress);
            return Ok();
        }
        [HttpGet("GetBodyParts")]
        public async Task<IActionResult> GetBodyParts()
        {
            var bodyParts = await _repositoryManager.BodyPart.GetAllAsync();

            return Ok(bodyParts);
        }        
    }
}
