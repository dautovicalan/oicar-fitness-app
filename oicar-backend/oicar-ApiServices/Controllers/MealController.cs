using AutoMapper;
using Domain.ErrorModel;
using Domain.Model;
using FitPal_Models.Dto;
using FitPal_Models.JsonModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;

namespace oicar_ApiServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public MealController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("ByDate")]
        public async Task<IActionResult> GetUserMealsByDate(int idUser, string date)
        {
            DateTime datetime = DateTime.Parse(date);
            var meals = await _repository.Meal.GetMeals(idUser, datetime);
            if (meals.Count() == 0)
                return NotFound(new HttpError("Meals are empty "));

            return Ok(_mapper.Map<List<MealDto>>(meals));
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreatUserMeal(CreateUserMealInput input)
        {
            var createdMeal = await _repository.Meal.CreateMeal(input.IdUser, input.MealTypeId, input.ParsedDate);
            if (createdMeal is null)
                return BadRequest(new HttpError("Error while creating meal"));

            return Ok(_mapper.Map<CreatedMealResponse>(createdMeal));
        }

        [HttpDelete("DeleteFood")]
        public async Task<IActionResult> DeleteFoodFromUserMeal(int idMeal, int idFood)
        {
            var meal = await _repository.Meal.GetMeal(idMeal);
            if (meal is not null)
            {
                await _repository.Meal.DeleteFoodFromMeal(meal, idFood);
                return Ok();
            }

            return BadRequest(new HttpError("Error while deleting food from meal"));
        }

        [HttpPost("AddFood")]
        public async Task<IActionResult> AddFoodToMeal(int idMeal, int foodId)
        {
            var meal = await _repository.Meal.GetMeal(idMeal);
            if (meal is null)
                return NotFound(new HttpError("Meal doesn't exist"));

            await _repository.Meal.AddFood(meal,foodId);

            return Ok();
        }     
    }
}
