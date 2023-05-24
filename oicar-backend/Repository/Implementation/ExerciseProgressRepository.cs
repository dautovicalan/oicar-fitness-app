using Domain.Model;
using Domain.Models;
using Repository.Base;
using Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}
