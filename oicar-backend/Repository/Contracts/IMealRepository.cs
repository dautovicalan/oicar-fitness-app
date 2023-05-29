using Domain.Model;

namespace Repository.Contracts
{
    public interface IMealRepository
    {
        Task<Meal> CreateMeal(int idUser, int mealTypeId, DateTime parsedDate);
        Task DeleteFoodFromMeal(Meal meal, int idFood);
        Task<Meal?> GetMeal(int idMeal);
        Task<List<Meal>> GetMeals(int idUser, DateTime date);
    }
}
