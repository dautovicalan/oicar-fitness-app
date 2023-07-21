using Domain.Models;
using FitPal_Models.Configuration;
using FitPal_Models.Dto;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Repository.Contracts;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;

namespace oicar_ApiServices.AppSettings
{
    public interface IJwtAuthManager
    {
        Task<AccountTokenDto> GenerateToken(int idUser);
    }

    public class JwtAuthManager : IJwtAuthManager
    {
        private readonly JwtConfiguration _jwtConfiguration;
        private readonly IUserRepository _userRepository;
        private readonly byte[] _secret;

        public JwtAuthManager(IOptions<JwtConfiguration> options, IUserRepository userRepository)
        {
            _jwtConfiguration = options.Value;
            _userRepository = userRepository;
            _secret = Encoding.ASCII.GetBytes(options.Value.SecretKey);
        }

        public async Task<AccountTokenDto> GenerateToken(int idUser)
        {
            User? user = await _userRepository.GetUser(idUser);
            
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.RoleId.ToString())
            };

            var shouldAddAudienceClaim = string.IsNullOrWhiteSpace(claims?.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Aud)?.Value);


            var jwtToken = new JwtSecurityToken(
                _jwtConfiguration.ValidIssuer,
                shouldAddAudienceClaim ? _jwtConfiguration.ValidAudience : string.Empty,
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(_secret), SecurityAlgorithms.HmacSha256Signature));

            var accesToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);

            return new AccountTokenDto
            {
                IdUser = user.Id,
                IsRegister = user.IsRegister,
                AccessToken = accesToken
            };
        }
    }
}
