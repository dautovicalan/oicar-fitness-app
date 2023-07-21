using Domain.Model;

namespace Repository.Contracts
{
    public interface IFoodRepository
    {
        Task<List<Food>> GetAll();
        Task<Food?> GetById(int idFood);
    }
}
