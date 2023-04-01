﻿using Domain.Models;
using FitPal_Models.JsonModels;

namespace Repository.Contracts
{
    public interface IUserRepository
    {
        Task<bool> CheckLogin(string email, string password);
        Task<User?> GetUser(int id);
        Task<User> RegisterUser(UserRegisterInput user);
    }
}