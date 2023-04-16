using RestApiServices.Contracts;
using RestApiServices.Implementation;

namespace RestApiServices
{
    public class RestApiManager : IRestApiManager
    {
        private readonly Lazy<IEquipmentApi> _equipmentApi;

        public RestApiManager(IHttpClientFactory factory)
        {
            _equipmentApi = new Lazy<IEquipmentApi>(() => new EquipmentApi(factory.CreateClient()));
        }
        public IEquipmentApi EquipmentApi => _equipmentApi.Value;
    }
}
