﻿using Domain.Migrations;
using Domain.Model;
using Domain.Models;
using FitPal_Models.JsonModels;
using Microsoft.EntityFrameworkCore;
using Repository.Base;
using Repository.Contracts;

namespace Repository.Implementation
{
    public class UserPreferencesRepository : RepositoryBase<UserPreferences>, IUserPreferencesRepository
    {
        private readonly RepositoryContext _repositoryContext;

        public UserPreferencesRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }
        public async Task<UserPreferences?> GetUserPreferences(int id) => await _repositoryContext.UserPreferences.FirstOrDefaultAsync(up => up.UserId == id);

        public async Task<UserPreferences> RegisterUserPreferences(UserPreferencesRegistrationInput registrationInput)
        {
            User? user = await _repositoryContext.Users.FirstOrDefaultAsync(u => u.Id == registrationInput.UserId);

            UserPreferences userPreferences = new()
            {
                UserId = registrationInput.UserId,
                Height = registrationInput.Height,
                Weight = registrationInput.Weight,
                Goal = registrationInput.Goal,
                WorkoutNumberPerWeek = registrationInput.WorkoutNumberPerWeek,
                Newsletter = registrationInput.Newsletter
            };

            Create(userPreferences);

            // Set flag that user is full registered
            if (user is not null)
                user.IsRegister = true;
            
            await _repositoryContext.SaveChangesAsync();
            return userPreferences;   
        }
        public Task<bool> UserHasPreferences(int id) => Any(up => up.UserId == id);
    }
}