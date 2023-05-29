using Domain.Model;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Repository.Base;
using Repository.Contracts;

namespace Repository.Implementation
{
    public class CustomWorkoutRepository : RepositoryBase<CustomWorkout>, ICustomWorkoutRepository
    {
        private readonly RepositoryContext _repositoryContext;

        public CustomWorkoutRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public async Task<int> CreateWorkout(CustomWorkout workout)
        {
            Create(workout);
            await _repositoryContext.SaveChangesAsync();
            return workout.Id;
        }

        public async Task<CustomWorkout?> GetUserCustomWorkout(int idUser, int idWorkout)
            => await _repositoryContext.CustomWorkout.Include(cw => cw.Exercises).FirstOrDefaultAsync(cw => cw.UserId == idUser && cw.Id == idWorkout && !cw.Deleted);


        public async Task<List<CustomWorkout>> GetUserCustomWorkouts(int idUser)
            => await _repositoryContext.CustomWorkout.Where(cw => cw.UserId == idUser && !cw.Deleted).ToListAsync();

        public async Task<CustomWorkout?> GetWorkoutsByDate(int idUser, DateTime date)
              => await _repositoryContext.CustomWorkout.Include(cw=> cw.Exercises).Where(ws => ws.UserId == idUser && !ws.Deleted
                          && ws.Date.Equals(date)).FirstOrDefaultAsync();

        public async Task AddExercises(int idWorkout, List<int> exerciseId)
        {
            CustomWorkout? workout = await _repositoryContext.CustomWorkout.Include(cw=> cw.Exercises).FirstOrDefaultAsync(cw => cw.Id == idWorkout && !cw.Deleted);

            foreach (var id in exerciseId.Distinct())
            {
                Exercise? dbExercise = await _repositoryContext.Exercise.FirstOrDefaultAsync(e => e.Id == id);
                if (dbExercise != null)
                {
                    bool workoutExerciseExist = workout.Exercises.Any(e => e.Id == dbExercise.Id);
                    if (!workoutExerciseExist)
                    {
                        workout?.Exercises.Add(dbExercise);
                    }
                }
            }
            await _repositoryContext.SaveChangesAsync();
        }

        public async Task UpdateWorkout(CustomWorkout workout)
        {
            Update(workout);
            await _repositoryContext.SaveChangesAsync();
        }

        public async Task DeleteWorkout(CustomWorkout workout)
        {
            workout.Deleted = true;
            await _repositoryContext.SaveChangesAsync();
        }

        public async Task<CustomWorkout?> GetWorkout(int idWorkout)
        => await _repositoryContext.CustomWorkout.Include(cw=> cw.Exercises).FirstOrDefaultAsync(cw => cw.Id == idWorkout);

        public async Task DeleteWorkoutExercise(CustomWorkout workout, int idExercise)
        {
            var exercise = await _repositoryContext.Exercise.FirstAsync(e => e.Id == idExercise);
            workout.Exercises.Remove(exercise);
            await _repositoryContext.SaveChangesAsync();
        }
    }
}
