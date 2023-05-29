using AutoMapper;
using Domain.ErrorModel;
using FitPal_Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;

namespace oicar_ApiServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        public FoodController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFoods()
        {
            var foodList = await _repository.Food.GetAll();

            return Ok(_mapper.Map<List<FoodDto>>(foodList));
        }

        [HttpGet("GetById")]
        public async Task<IActionResult> GetFoodById(int idFood)
        {
            var food = await _repository.Food.GetById(idFood);
            if (food is null)
                return NotFound(new HttpError("Food doesn't exist"));

            return Ok(_mapper.Map<FoodDto>(food));
        }

    }
}
