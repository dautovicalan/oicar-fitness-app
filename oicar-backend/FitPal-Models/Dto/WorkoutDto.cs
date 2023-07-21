namespace FitPal_Models.Dto
{
    public class WorkoutDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ExercisesDto> Exercises { get; set; }
    }
}
