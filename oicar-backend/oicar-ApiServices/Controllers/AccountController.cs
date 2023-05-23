using AutoMapper;
using Domain.ErrorModel;
using Domain.Models;
using FitPal_Models.Dto;
using FitPal_Models.JsonModels;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using oicar_ApiServices.AppSettings;
using Repository;

namespace oicar_ApiServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        private readonly ISocialLoginManager _socialLoginManager;
        private readonly IJwtAuthManager _jwtAuthManager;

        public AccountController(IRepositoryManager repositoryManager, IMapper mapper, ISocialLoginManager socialLoginManager, IJwtAuthManager jwtAuthManager)
        {
            _repository = repositoryManager;
            _mapper = mapper;
            _socialLoginManager = socialLoginManager;
            _jwtAuthManager = jwtAuthManager;
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginInput userLogin)
        {
            if (await _repository.User.CheckLogin(userLogin.Email, userLogin.Password))
            {
                User? user = await _repository.User.GetUserByEmail(userLogin.Email);
                return Ok(await _jwtAuthManager.GenerateToken(user!.Id));
            }

            return BadRequest();
        }

        [HttpPost("LoginGoogle")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginWithGoogle(string accessToken)
        {
            GoogleJsonWebSignature.Payload? payload = await _socialLoginManager.GoogleAuthentication(accessToken);
            if (payload is null)
                return BadRequest(new HttpError("Error while login with google"));

            return Ok();
        }

        [HttpGet("GetUser")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUser(int id)
        {
            User? user = await _repository.User.GetUser(id);

            if (user is null)
                return NotFound(new HttpError("User does not exist"));

            return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserRegisterInput userInput)
        {
            if (await _repository.User.IsEmailExist(userInput.Email))
                return BadRequest(new HttpError("Email already exist"));

            var newUser = await _repository.User.RegisterUser(userInput);
            var newUserDto = _mapper.Map<UserDto>(newUser);

            return Ok(newUserDto);
        }

        [HttpPost("ForgotPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            if (!await _repository.User.IsEmailExist(email))
                return BadRequest(new HttpError("Wrong email"));

            string resetCode = (new Random()).Next(100000, 999999).ToString();
            await _repository.User.SaveResetPasswordCode(email, resetCode);

            return Ok();
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordInput changePassword)
        {
            // Get references
            string email = changePassword.Email;
            string password = changePassword.Password;

            if (!await _repository.User.IsEmailExist(email))
                return BadRequest(new HttpError("User doesn't exist"));

            User? user = await _repository.User.ChangePassword(email, password);

            if (user == null)
                return BadRequest(new HttpError("Wrong code"));

            return Ok();
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteUser(int idUser)
        {
            await _repository.User.DeleteUser(idUser);
            return Ok();
        }

    }
}
