using Domain.Model;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Repository.Base;
using Repository.Contracts;

namespace Repository.Implementation
{
    public class BodyPartRepository : RepositoryBase<BodyPart>, IBodyPartRepository
    {
        private readonly RepositoryContext _repositoryContext;

        public BodyPartRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public void AddBodyPart(BodyPart bodyPart) => Create(bodyPart);

        public async Task<IEnumerable<BodyPart>> GetAllAsync() => await _repositoryContext.BodyPart.ToListAsync();

    }
}
