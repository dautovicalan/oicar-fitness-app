﻿using Domain.Model;
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
            var databaseEquipments = await repositoryManager.Equipment.GetAllAsync();

            foreach (var equipmentName in equipments)
            {
                var existingEquipment = databaseEquipments.FirstOrDefault(e => e.Name.ToLower() == equipmentName.ToLower());
                if (existingEquipment == null)
                {
                    // Equipment does not exist in the database, so add it
                    Equipment equipment = new()
                    {
                        Name = equipmentName
                    };
                    repositoryManager.Equipment.AddEquipment(equipment);
                }
            }
            await repositoryManager.SaveAsync();
            return Ok(equipments);
        }

        [HttpGet("BodyParts")]
        public async Task<IActionResult> GetAllBodyParts()
        {
            var bodyParts = await apiManager.ExerciseApi.GetAllBodyParts();
            var databaseBodyParts = await repositoryManager.BodyPart.GetAllAsync();

            foreach (var bp in bodyParts)
            {
                var existingBodyPart = databaseBodyParts.FirstOrDefault(b => b.Name.ToLower() == bp.ToLower());
                if (existingBodyPart == null)
                {
                    // Body part does not exist in the database, so add it
                    BodyPart bodyPart = new()
                    {
                        Name = bp
                    };
                    repositoryManager.BodyPart.AddBodyPart(bodyPart);
                }
            }
            await repositoryManager.SaveAsync();
            return Ok();
        }

        [HttpGet("TargetMuscles")]
        public async Task<IActionResult> GetAllTargetMuscles()
        {
            var targetMuscles = await apiManager.ExerciseApi.GetAllTargetMuscles();
            var databaseTargetMuscles = await repositoryManager.TargetMuscle.GetAllAsync();

            foreach (var tm in targetMuscles)
            {
                var existingTargetMuscle = databaseTargetMuscles.FirstOrDefault(t => t.Name.ToLower() == tm.ToLower());
                if (existingTargetMuscle == null)
                {
                    // Target muscle does not exist in the database, so add it
                    TargetMuscle targetMuscle = new()
                    {
                        Name = tm
                    };
                    repositoryManager.TargetMuscle.AddTargetMuscle(targetMuscle);
                }
            }

            await repositoryManager.SaveAsync();
            return Ok();
        }

        //[HttpGet("Exercises")]
        //public async Task<IActionResult> GetAllExercises()
        //{
        //    var apiExercises = await apiManager.ExerciseApi.GetAllExercises();
        //    var bodyParts = await repositoryManager.BodyPart.GetAllAsync();
        //    var equipment = await repositoryManager.Equipment.GetAllAsync();
        //    var targetMuscle = await repositoryManager.TargetMuscle.GetAllAsync();

        //    foreach (var data in apiExercises)
        //    {
        //        // Get foreign keys from database
        //        int bodyPartId = bodyParts.First(bp => bp.Name.ToLower() == data.bodyPart.ToLower()).Id;
        //        int equipmentId = equipment.First(e => e.Name.ToLower() == data.equipment.ToLower()).Id;
        //        int targetMuscleId = targetMuscle.First(tm => tm.Name.ToLower() == data.target.ToLower()).Id;

        //        Exercise exercise = new()
        //        {
        //            Name = data.name,
        //            GifUrl = data.gifUrl,
        //            BodyPartId = bodyPartId,
        //            EquipmentId = equipmentId,
        //            TargetMuscleId = targetMuscleId
        //        };
        //        repositoryManager.Exercise.AddExercise(exercise);
        //    }

        //    await repositoryManager.SaveAsync();

        //    return Ok();
        //}
    }
}
