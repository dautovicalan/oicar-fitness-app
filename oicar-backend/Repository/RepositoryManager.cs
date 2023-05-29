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
        private readonly Lazy<ICustomWorkoutRepository> _customWorkoutRepository;
        private readonly Lazy<IExerciseProgressRepository> _exerciseProgressRepository;
        private readonly Lazy<IMealRepository> _mealRepository;
        private readonly Lazy<IFoodRepository> _foodRepository;

        public RepositoryManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
            _userRepository = new Lazy<IUserRepository>(() => new UserRepository(repositoryContext));
            _userPreferencesRepository = new Lazy<IUserPreferencesRepository>(() => new UserPreferencesRepository(repositoryContext));
            _equipmentRepository = new Lazy<IEquipmentRepository>(() => new EquipmentRepository(repositoryContext));
            _bodyPartRepository = new Lazy<IBodyPartRepository>(() => new BodyPartRepository(repositoryContext));
            _targetMuscleRepository = new Lazy<ITargetMuscleRepository>(() => new TargetMuscleRepository(repositoryContext));
            _exerciseRepository = new Lazy<IExerciseRepository>(()=> new ExerciseRepository(repositoryContext));
            _customWorkoutRepository = new Lazy<ICustomWorkoutRepository>(()=> new CustomWorkoutRepository(repositoryContext));
            _exerciseProgressRepository = new Lazy<IExerciseProgressRepository> (() => new ExerciseProgressRepository(repositoryContext));
            _mealRepository = new Lazy<IMealRepository>(() => new MealRepository(repositoryContext));
            _foodRepository = new Lazy<IFoodRepository>(() => new FoodRepository(repositoryContext));
        }

        public IUserRepository User => _userRepository.Value;
        public IUserPreferencesRepository UserPreferences => _userPreferencesRepository.Value;
        public IEquipmentRepository Equipment => _equipmentRepository.Value;
        public IBodyPartRepository BodyPart => _bodyPartRepository.Value;
        public ITargetMuscleRepository TargetMuscle => _targetMuscleRepository.Value;
        public IExerciseRepository Exercise => _exerciseRepository.Value;
        public ICustomWorkoutRepository CustomWorkout => _customWorkoutRepository.Value;
        public IExerciseProgressRepository ExerciseProgress => _exerciseProgressRepository.Value;

        public IMealRepository Meal => _mealRepository.Value;

        public IFoodRepository Food => _foodRepository.Value;

        public void Save() => _repositoryContext.SaveChanges();
        public async Task SaveAsync() => await _repositoryContext.SaveChangesAsync();
    }
}
