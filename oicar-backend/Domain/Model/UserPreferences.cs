using Domain.Models;

namespace Domain.Model
{
    public class UserPreferences
    {
        public int Id { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public string Goal { get; set; }
        public int WorkoutNumberPerWeek { get; set; }
        public int UserId { get; set; }
        public bool Newsletter { get; set; }
        public virtual User? User { get; set; }
    }
}
