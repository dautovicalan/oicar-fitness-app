namespace Domain.Model
{
    public class WorkoutSchedule
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int CustomWorkoutId { get; set; }
        public CustomWorkout CustomWorkout { get; set; }
    }
}
