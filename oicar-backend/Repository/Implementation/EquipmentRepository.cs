using Domain.Model;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Repository.Base;
using Repository.Contracts;

namespace Repository.Implementation
{
    public class EquipmentRepository : RepositoryBase<Equipment>, IEquipmentRepository
    {
        private readonly RepositoryContext _repositoryContext;
        public EquipmentRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public void AddEquipment(Equipment equipment) => Create(equipment);

        public async Task<List<Equipment>> GetAllAsync() => await _repositoryContext.Equipment.ToListAsync();
    }
}
