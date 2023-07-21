namespace FitPal_Models.JsonModels
{
    public class ExerciseProgressInput
    {
        public int UserId { get; set; }
        public int ExerciseId { get; set; }
        public int NumberOfSets { get; set; }
        public int NumberOfReps { get; set; }
        public int Weight { get; set; }
        public DateTime Date { get; set; }

    }
}
