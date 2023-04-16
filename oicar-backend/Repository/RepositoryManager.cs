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
        private readonly Lazy<IBodyPartRepository> _bodyPartRepository;
        private readonly Lazy<ITargetMuscleRepository> _targetMuscleRepository;
        private readonly Lazy<IExerciseRepository> _exerciseRepository;

        public RepositoryManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
            _userRepository = new Lazy<IUserRepository>(() => new UserRepository(repositoryContext));
            _userPreferencesRepository = new Lazy<IUserPreferencesRepository>(() => new UserPreferencesRepository(repositoryContext));
            _equipmentRepository = new Lazy<IEquipmentRepository>(() => new EquipmentRepository(repositoryContext));
            _bodyPartRepository = new Lazy<IBodyPartRepository>(() => new BodyPartRepository(repositoryContext));
            _targetMuscleRepository = new Lazy<ITargetMuscleRepository>(() => new TargetMuscleRepository(repositoryContext));
            _exerciseRepository = new Lazy<IExerciseRepository>(()=> new ExerciseRepository(repositoryContext));
        }

        public IUserRepository User => _userRepository.Value;
        public IUserPreferencesRepository UserPreferences => _userPreferencesRepository.Value;
        public IEquipmentRepository Equipment => _equipmentRepository.Value;
        public IBodyPartRepository BodyPart => _bodyPartRepository.Value;
        public ITargetMuscleRepository TargetMuscle => _targetMuscleRepository.Value;
        public IExerciseRepository Exercise => _exerciseRepository.Value;

        public void Save() => _repositoryContext.SaveChanges();
        public async Task SaveAsync() => await _repositoryContext.SaveChangesAsync();
    }
}
