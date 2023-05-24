using Microsoft.AspNetCore.Mvc;
using Repository;

namespace oicar_ApiServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly IRepositoryManager _repositoryManager;

        public ExerciseController(IRepositoryManager repositoryManager)
        {
            _repositoryManager = repositoryManager;
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
        [HttpGet("GetBodyParts")]
        public async Task<IActionResult> GetBodyParts()
        {
            var bodyParts = await _repositoryManager.BodyPart.GetAllAsync();

            return Ok(bodyParts);
        }
    }
}
