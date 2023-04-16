using Domain.Model;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Repository.Base;
using Repository.Contracts;

namespace Repository.Implementation
{
    public class ExerciseRepository : RepositoryBase<Exercise>, IExerciseRepository
    {
        private readonly RepositoryContext _repositoryContext;

        public ExerciseRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public void AddExercise(Exercise exercise) => Create(exercise);

        public async Task<IEnumerable<Exercise>> GetAllExerciseAsync() => await _repositoryContext.Exercise.ToListAsync();

    }
}
