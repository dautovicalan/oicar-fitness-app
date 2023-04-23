namespace Domain.Model
{
    public class ExerciseProgress
    {
        public int Id { get; set; }
        public int ExerciseId { get; set; }
        public virtual Exercise Exercise { get; set; }
        public int NumberOfSets { get; set; }
        public int Weight { get; set; }
        public int NumberOfReps { get; set; }
    }
}
