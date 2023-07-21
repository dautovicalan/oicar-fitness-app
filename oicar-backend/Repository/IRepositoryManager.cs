using Repository.Contracts;

namespace Repository
{
    public interface IRepositoryManager
    {
        public IUserRepository User { get; }
        public IUserPreferencesRepository UserPreferences { get; }
        Task SaveAsync();
        void Save();
    }
}
