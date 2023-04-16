using Repository.Contracts;

namespace Repository
{
    public interface IRepositoryManager
    {
        public IUserRepository User { get; }
        public IUserPreferencesRepository UserPreferences { get; }
        public IEquipmentRepository Equipment { get; }
        public IBodyPartRepository BodyPart { get; }
        public ITargetMuscleRepository TargetMuscle { get; }
        Task SaveAsync();
        void Save();
    }
}
