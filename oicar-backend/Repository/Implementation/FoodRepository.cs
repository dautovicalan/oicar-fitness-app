using Domain.Model;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Repository.Base;
using Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Implementation
{
    public class FoodRepository : RepositoryBase<Food>, IFoodRepository
    {
        private readonly RepositoryContext _repositoryContext;
        public FoodRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public async Task<List<Food>> GetAll() => await _repositoryContext.Food.ToListAsync();


        public async Task<Food?> GetById(int idFood) => await _repositoryContext.Food.FirstOrDefaultAsync(f => f.Id == idFood);
        
    }
}
