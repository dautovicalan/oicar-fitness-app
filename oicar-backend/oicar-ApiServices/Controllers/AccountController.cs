﻿using AutoMapper;
using Domain.ErrorModel;
using Domain.Models;
using FitPal_Models.Dto;
using FitPal_Models.JsonModels;
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
        public async Task<IActionResult> Login(UserLoginInput userLogin)
        {
            if (await _repository.User.CheckLogin(userLogin.Email, userLogin.Password))
            {
                User? user = await _repository.User.GetUserByEmail(userLogin.Email);
                return Ok(_mapper.Map<UserDto>(user));
            }
              
            return Forbid();
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            User? user = await _repository.User.GetUser(id);

            if (user is null)
                return NotFound(new HttpError("User does not exist"));
            
            return Ok(user);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserRegisterInput userInput)
        {
            if (await _repository.User.IsEmailExist(userInput.Email))
                return BadRequest(new HttpError("Email already exist"));

            var newUser = await _repository.User.RegisterUser(userInput);
            var newUserDto = _mapper.Map<UserDto>(newUser);

            return Ok(newUserDto);
        }
    }
}
