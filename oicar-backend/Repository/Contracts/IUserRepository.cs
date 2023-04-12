using Domain.Models;
using FitPal_Models.JsonModels;

namespace Repository.Contracts
{
    public interface IUserRepository
    {
        Task<bool> CheckLogin(string email, string password);
        Task<User?> GetUser(int id);
        Task<User?> GetUserByEmail(string email);
        Task<User> RegisterUser(UserRegisterInput user);
        Task<bool> IsEmailExist(string email);
        Task SaveResetPasswordCode(string email, string resetCode);
        Task<User?> ChangePassword(string email, string code, string password);
    }
}
