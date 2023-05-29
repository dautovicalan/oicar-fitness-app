using Domain.Migrations;
using Domain.Model;
using FitPal_Models.JsonModels;

namespace Repository.Contracts
{
    public interface IUserPreferencesRepository
    {
        Task<UserPreferences?> GetUserPreferences(int idUser);
        Task<bool> UserHasPreferences(int id);
        Task<UserPreferences> RegisterUserPreferences(UserPreferencesInput registrationInput);
        Task UpdateUserPreferences(UserPreferences userPreferences);
    }
}
