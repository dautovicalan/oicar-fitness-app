using RestApiServices.Contracts;
using RestApiServices.Implementation;

namespace RestApiServices
{
    public class RestApiManager : IRestApiManager
    {
        private readonly Lazy<IExerciseApi> _equipmentApi;

        public RestApiManager(IHttpClientFactory factory)
        {
            _equipmentApi = new Lazy<IExerciseApi>(() => new ExerciseApi(factory.CreateClient()));
        }
        public IExerciseApi ExerciseApi => _equipmentApi.Value;
    }
}
