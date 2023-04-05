using Domain.Migrations;
using Domain.Model;
using FitPal_Models.JsonModels;

namespace Repository.Contracts
{
    public interface IUserPreferencesRepository
    {
        Task<UserPreferences?> GetUserPreferences(int id);
        Task<bool> UserHasPreferences(int id);
        Task<UserPreferences> RegisterUserPreferences(UserPreferencesRegistrationInput registrationInput);
    }
}
