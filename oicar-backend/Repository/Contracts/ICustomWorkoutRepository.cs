using Domain.Model;

namespace Repository.Contracts
{
    public interface ICustomWorkoutRepository
    {
        Task<int> CreateWorkout(CustomWorkout workout);
        Task<List<CustomWorkout>> GetUserCustomWorkouts(int idUser);
        Task<CustomWorkout?> GetUserCustomWorkout(int idUser, int idWorkout);
        Task<CustomWorkout?> GetWorkoutsByDate(int idUser, DateTime date);
        Task AddExercises(int idWorkout, List<int> exerciseId);
        Task UpdateWorkout(CustomWorkout workout);
        Task DeleteWorkout(CustomWorkout workout);
        Task<CustomWorkout?> GetWorkout(int idWorkout);
        Task DeleteWorkoutExercise(CustomWorkout workout, int idExercise);
    }
}
