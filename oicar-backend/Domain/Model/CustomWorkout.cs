using Domain.Models;

namespace Domain.Model
{
    public class CustomWorkout
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public bool Deleted { get; set; }
        public virtual User? User { get; set; }
        public virtual ICollection<WorkoutSchedule> WorkoutsSchedule { get; } = new List<WorkoutSchedule>();
        public virtual ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
    }
}
