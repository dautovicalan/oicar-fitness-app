using Domain.Models;

namespace Domain.Model
{
    public class CustomWorkout
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public virtual User? User { get; set; }
        public virtual ICollection<WorkoutSchedule> WorkoutSchedules { get; } = new List<WorkoutSchedule>();
        public virtual ICollection<WorkoutExercise> WorkoutExercises { get; } = new List<WorkoutExercise>();
    }
}
