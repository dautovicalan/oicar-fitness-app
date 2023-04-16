using RestApiServices.Contracts;

namespace RestApiServices
{
    public interface IRestApiManager
    {
        public IExerciseApi ExerciseApi { get; }
    }
}
