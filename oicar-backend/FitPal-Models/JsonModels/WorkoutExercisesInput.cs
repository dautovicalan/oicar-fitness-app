namespace FitPal_Models.JsonModels
{
    public class WorkoutExercisesInput
    {
        public int IdWorkout { get; set; }
        public List<int> ExercisesIds { get; set;} = new List<int>();
    }
}
