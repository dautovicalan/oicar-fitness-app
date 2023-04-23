namespace Domain.Model
{
    public class Equipment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
    }
}
