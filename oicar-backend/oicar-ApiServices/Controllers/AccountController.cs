using AutoMapper;
using Domain.ErrorModel;
using Domain.Models;
using FitPal_Models.Dto;
using FitPal_Models.JsonModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;

namespace oicar_ApiServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public AccountController(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repository = repositoryManager;
            _mapper = mapper;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(string email, string password)
        {
            if (await _repository.User.CheckLogin(email, password))
                return Ok();

            return Forbid();
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {

            User? user = await _repository.User.GetUser(id);

            if (user == null)
                return NotFound(new HttpError("Korisnik ne postoji"));
            

            return Ok(user);
        }

        [HttpPut("Register")]

        public async Task<IActionResult> Register(UserRegisterInput userInput)
        {
            var newUser = await _repository.User.RegisterUser(userInput);

            var newUserDto = _mapper.Map<UserDto>(newUser);

            return Ok(newUserDto);
        }
    }
}
