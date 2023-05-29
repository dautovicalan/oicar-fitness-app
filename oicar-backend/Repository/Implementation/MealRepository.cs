using Domain.Model;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Repository.Base;
using Repository.Contracts;

namespace Repository.Implementation
{
    public class MealRepository : RepositoryBase<Meal>, IMealRepository
    {
        private readonly RepositoryContext _repositoryContext;
        public MealRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public async Task<Meal> CreateMeal(int idUser, int mealTypeId, DateTime parsedDate)
        {
            Meal meal = new Meal
            {
                UserID = idUser,
                MealTypeId = mealTypeId,
                MealDate = parsedDate
            };
            Create(meal);
            await _repositoryContext.SaveChangesAsync();
            return meal;
        }

        public async Task DeleteFoodFromMeal(Meal meal, int idFood)
        {
            var food = await _repositoryContext.Food.FirstOrDefaultAsync(f => f.Id == idFood);
            if (food is not null)
            {
                meal.Foods.Remove(food);
                await _repositoryContext.SaveChangesAsync();
            }

        }

        public async Task<Meal?> GetMeal(int idMeal) => await _repositoryContext.Meal.Include(m => m.Foods).Include(m => m.MealType).FirstOrDefaultAsync(m => m.Id == idMeal);

        public async Task<List<Meal>> GetMeals(int idUser, DateTime date) =>
            await _repositoryContext.Meal.Include(m => m.MealType)
                                         .Include(m => m.Foods)
                                         .Where(m => m.UserID == idUser && date.Date.Equals(m.MealDate.Date)).ToListAsync();

    }
}
