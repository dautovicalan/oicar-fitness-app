namespace FitPal_Models.Dto
{
    public class UserPreferencesDto
    {
        public int Height { get; set; }
        public int Weight { get; set; }
        public string Goal { get; set; }
        public int WorkoutNumberPerWeek { get; set; }
        public int UserId { get; set; }
        public bool Newsletter { get; set; }
    }
}
