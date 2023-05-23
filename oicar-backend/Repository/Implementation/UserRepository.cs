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

        public async Task<bool> CheckLogin(string email, string password) => await Any(u => u.Email.Equals(email) && u.Password.Equals(password.SHA512Hash()) && u.Deleted != true);
        public Task<User?> GetUser(int id) => _repositoryContext.Users.FirstOrDefaultAsync(u => u.Id == id && u.Deleted != true );

        public async Task<User?> GetUserByEmail(string email) => await _repositoryContext.Users.FirstOrDefaultAsync(u=> u.Email.Equals(email) && u.Deleted != true);

        public async Task<bool> IsEmailExist(string email) => await Any(u=> u.Email.Equals(email) && u.Deleted != true);

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
                Deleted = false
            };

            Create(newUser);
            await _repositoryContext.SaveChangesAsync();

            return newUser;
        }

        public async Task SaveResetPasswordCode(string email, string resetCode)
        {
            User? user = await GetUserByEmail(email);

            if (user is not null)
            {
                user.ForgotPasswordCode = resetCode;
                user.ForgotPasswordCreateDate = DateTime.UtcNow;
            }

            await _repositoryContext.SaveChangesAsync();
        }


        public async Task<User?> ChangePassword(string email, string password)
        {
            User? user = await GetUserByEmail(email);

            if (user is null)
                return null;
            
            user.Password = password.SHA512Hash();
            user.ForgotPasswordCode = string.Empty;
            user.ForgotPasswordCreateDate = null;

            await _repositoryContext.SaveChangesAsync();
            return user;
        }

        public async Task DeleteUser(int id)
        {
            User? user = await GetUser(id);

            if (user is not null)
            {
                user.Deleted = true;
                await _repositoryContext.SaveChangesAsync();
            }
        }
    }
}
