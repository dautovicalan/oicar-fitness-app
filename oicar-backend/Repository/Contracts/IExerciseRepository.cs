using Domain.Model;

namespace Repository.Contracts
{
    public interface IExerciseRepository
    {
        void AddExercise(Exercise exercise);
        Task<IEnumerable<Exercise>> GetAllExerciseAsync();
        Task<IEnumerable<Exercise>> GetExerciseByBodyPart(int idBodyPart);
    }
}
