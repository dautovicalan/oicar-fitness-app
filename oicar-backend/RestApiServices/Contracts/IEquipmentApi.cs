using Domain.Model;

namespace RestApiServices.Contracts
{
    public interface IEquipmentApi
    {
        Task<IEnumerable<string>> GetAllEquipments();
    }
}
