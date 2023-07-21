using Domain.Models;
using Repository.Contracts;
using Repository.Implementation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly RepositoryContext _repositoryContext;

        private readonly Lazy<IUserRepository> _userRepository;
        private readonly Lazy<IUserPreferencesRepository> _userPreferencesRepository;

        public RepositoryManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
            _userRepository = new Lazy<IUserRepository>(() => new UserRepository(repositoryContext));
            _userPreferencesRepository = new Lazy<IUserPreferencesRepository>(()=> new UserPreferencesRepository(repositoryContext));
        }

        public IUserRepository User => _userRepository.Value;
        public IUserPreferencesRepository UserPreferences => _userPreferencesRepository.Value;
        public void Save() => _repositoryContext.SaveChanges();
        public async Task SaveAsync() => await _repositoryContext.SaveChangesAsync();
    }
}
