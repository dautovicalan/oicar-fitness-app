using Domain.Model;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Repository.Base;
using Repository.Contracts;

namespace Repository.Implementation
{
    public class ExerciseProgressRepository : RepositoryBase<ExerciseProgress> ,IExerciseProgressRepository
    {
        private readonly RepositoryContext _repositoryContext;
        public  ExerciseProgressRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public async Task CreateExerciseProgress(ExerciseProgress exerciseProgress)
        {
            Create(exerciseProgress);
            await _repositoryContext.SaveChangesAsync();
        }

        public async Task<ExerciseProgress?> Get(int idExerciseProgress) => 
            await _repositoryContext.ExerciseProgress.FirstOrDefaultAsync(ep => ep.Id == idExerciseProgress);

        public async Task<List<ExerciseProgress>> GetUserExerciseProgress(int idUser, int idExercise)
        => await _repositoryContext.ExerciseProgress.Where(ep=> ep.ExerciseId == idExercise && ep.UserId == idUser).ToListAsync();
    }
}
