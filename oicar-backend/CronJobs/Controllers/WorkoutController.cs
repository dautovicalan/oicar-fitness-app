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
            var equipments = await apiManager.EquipmentApi.GetAllEquipments();
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
            
            return Ok();
        }
    }
}
