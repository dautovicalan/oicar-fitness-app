using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Repository.Base;
using Repository.Contracts;
using FitPal_Models.Exstensions;
using FitPal_Models.JsonModels;

namespace Repository.Implementation
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        private readonly RepositoryContext _repositoryContext;

        public UserRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public async Task<bool> CheckLogin(string email, string password) => await Any(u => u.Email.Equals(email) && u.Password.Equals(password.SHA512Hash()) && u.Deleted == false);
        public Task<User?> GetUser(int id) => _repositoryContext.Users.FirstOrDefaultAsync(u => u.Id == id);

        public async Task<User?> GetUserByEmail(string email) => await _repositoryContext.Users.FirstOrDefaultAsync(u=> u.Email.Equals(email));


        public async Task<bool> IsEmailExist(string email) => await Any(u=> u.Email.Equals(email));

        public async Task<User> RegisterUser(UserRegisterInput user)
        {
            Role role = await _repositoryContext.Roles.FirstAsync(r => r.Name.ToLower().Equals("user"));

            User newUser = new User
            {
                Email = user.Email,
                Password = user.Password.SHA512Hash(),
                Name = user.Name,
                Surname = user.Surname,
                RoleId = role.Id,
                Deleted = false,
                IsRegister = true
            };

            Create(newUser);
            await _repositoryContext.SaveChangesAsync();

            return newUser;
        }
    }
}
