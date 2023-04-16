using Domain.Model;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Repository.Base;
using Repository.Contracts;

namespace Repository.Implementation
{
    public class TargetMuscleRepository : RepositoryBase<TargetMuscle>, ITargetMuscleRepository
    {
        private readonly RepositoryContext _repositoryContext;

        public TargetMuscleRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public void AddTargetMuscle(TargetMuscle targetMuscle) => Create(targetMuscle);

        public async Task<IEnumerable<TargetMuscle>> GetAllAsync() => await _repositoryContext.TargetMuscles.ToListAsync();

    }
}
