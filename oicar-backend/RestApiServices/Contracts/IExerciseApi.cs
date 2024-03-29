﻿using FitPal_Models.JsonModels.RestApiExercises;

namespace RestApiServices.Contracts
{
    public interface IExerciseApi
    {
        Task<IEnumerable<string>> GetAllEquipments();
        Task<IEnumerable<string>> GetAllBodyParts();
        Task<IEnumerable<string>> GetAllTargetMuscles();
        Task<IEnumerable<ExerciseResponse>> GetAllExercises();
    }
}
