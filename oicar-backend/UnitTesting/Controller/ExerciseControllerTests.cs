using AutoMapper;
using Domain.Model;
using FakeItEasy;
using FitPal_Models.JsonModels;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using oicar_ApiServices.Controllers;
using Repository;

namespace UnitTesting.Controller
{
    public class ExerciseControllerTests
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ExerciseControllerTests()
        {
            _repositoryManager = A.Fake<IRepositoryManager>();
            _mapper = A.Fake<IMapper>();
        }

        [Fact]
        public void ExerciseController_GetAllExercises_ReturnOk()
        {
            //Arrange
            var exerciseList = A.Fake<List<Exercise>>();
            var controller = new ExerciseController(_repositoryManager, _mapper);
            //Act
            var result = controller.GetAllExercises();

            //Assert
            result.Should().NotBeNull();
        }

        [Fact]
        public async Task ExerciseController_Create_ReturnOk()
        {
            //Arrange
            var exerciseProgress = A.Fake<ExerciseProgress>();
            var exerciseProgressCreateInput = A.Fake<ExerciseProgressInput>();
            A.CallTo(()=> _mapper.Map<ExerciseProgress>(exerciseProgressCreateInput)).Returns(exerciseProgress);
            A.CallTo(() => _repositoryManager.ExerciseProgress.CreateExerciseProgress(exerciseProgress)).Returns(Task.CompletedTask);

            var controller = new ExerciseController(_repositoryManager, _mapper);
            // Act
            var result = await controller.CreateExerciseProgress(exerciseProgressCreateInput) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal(exerciseProgress.Id, result.Value);
        }
    }
}