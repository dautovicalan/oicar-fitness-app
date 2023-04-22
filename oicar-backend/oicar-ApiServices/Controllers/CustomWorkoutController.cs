using AutoMapper;
using FitPal_Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;

namespace oicar_ApiServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomWorkoutController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public CustomWorkoutController(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("Create")]
        public async Task<IActionResult> GetUserPreferences(string name)
        {
            return Ok();
        }
    }
}
