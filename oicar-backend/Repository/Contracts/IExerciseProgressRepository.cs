using Domain.Model;

namespace Repository.Contracts
{
    public interface IExerciseProgressRepository
    {
        public Task CreateExerciseProgress(ExerciseProgress exerciseProgress);
    }
}
