using RestApiServices.Contracts;

namespace RestApiServices
{
    public interface IRestApiManager
    {
        public IEquipmentApi EquipmentApi { get; }
    }
}
