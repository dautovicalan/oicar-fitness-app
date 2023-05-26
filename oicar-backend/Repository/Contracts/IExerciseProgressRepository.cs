using Domain.Model;

namespace Repository.Contracts
{
    public interface IExerciseProgressRepository
    {
        public Task CreateExerciseProgress(ExerciseProgress exerciseProgress);
        public Task<ExerciseProgress?> Get(int idExerciseProgress);
        public Task<List<ExerciseProgress>> GetUserExerciseProgress(int idUser, int idExercise);
    }
}
