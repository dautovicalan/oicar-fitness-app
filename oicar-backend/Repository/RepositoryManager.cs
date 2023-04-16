using Domain.Models;
using Repository.Contracts;
using Repository.Implementation;

namespace Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly RepositoryContext _repositoryContext;

        private readonly Lazy<IUserRepository> _userRepository;
        private readonly Lazy<IUserPreferencesRepository> _userPreferencesRepository;
        private readonly Lazy<IEquipmentRepository> _equipmentRepository;

        public RepositoryManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
            _userRepository = new Lazy<IUserRepository>(() => new UserRepository(repositoryContext));
            _userPreferencesRepository = new Lazy<IUserPreferencesRepository>(() => new UserPreferencesRepository(repositoryContext));
            _equipmentRepository = new Lazy<IEquipmentRepository>(() => new EquipmentRepository(repositoryContext));
        }

        public IUserRepository User => _userRepository.Value;
        public IUserPreferencesRepository UserPreferences => _userPreferencesRepository.Value;
        public IEquipmentRepository Equipment => _equipmentRepository.Value;
        public void Save() => _repositoryContext.SaveChanges();
        public async Task SaveAsync() => await _repositoryContext.SaveChangesAsync();
    }
}
