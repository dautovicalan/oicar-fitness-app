using Domain.Model;
using Microsoft.AspNetCore.Mvc;
using Repository;
using RestApiServices;

namespace CronJobs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly IRestApiManager apiManager;
        private readonly IRepositoryManager repositoryManager;

        public WorkoutController(IRestApiManager apiManager, IRepositoryManager repositoryManager)
        {
            this.apiManager = apiManager;
            this.repositoryManager = repositoryManager;
        }

        [HttpGet("Equipments")]
        public async Task<IActionResult> GetEquipments()
        {
            var equipments = await apiManager.ExerciseApi.GetAllEquipments();
            equipments.ToList().ForEach(equipmentName =>
            {
                Equipment equipment = new()
                {
                    Name = equipmentName
                };
                repositoryManager.Equipment.AddEquipment(equipment);
            });
            await repositoryManager.SaveAsync();
            return Ok(equipments);
        }

        [HttpGet("BodyParts")]
        public async Task<IActionResult> GetAllBodyParts()
        {
            var bodyParts = await apiManager.ExerciseApi.GetAllBodyParts();
            bodyParts.ToList().ForEach(bp =>
            {
                BodyPart bodyPart = new()
                {
                    Name = bp
                };
                repositoryManager.BodyPart.AddBodyPart(bodyPart);
            });
            await repositoryManager.SaveAsync();
            return Ok();
        }

        [HttpGet("TargetMuscles")]
        public async Task<IActionResult> GetAllTargetMuscles()
        {
            var targetMuscles = await apiManager.ExerciseApi.GetAllTargetMuscles();
            targetMuscles.ToList().ForEach(tm =>
            {
                TargetMuscle targetMuscle = new()
                {
                    Name = tm
                };
                repositoryManager.TargetMuscle.AddTargetMuscle(targetMuscle);
            });

            await repositoryManager.SaveAsync();
            return Ok();
        }
    }
}
