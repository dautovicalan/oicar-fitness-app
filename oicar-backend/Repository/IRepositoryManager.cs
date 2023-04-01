using Repository.Contracts;

namespace Repository
{
    public interface IRepositoryManager
    {
        public IUserRepository User { get; }
        Task SaveAsync();
        void Save();
    }
}
