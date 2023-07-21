namespace Domain.Model
{
    public class Food
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double ProteinsPer100g { get; set; }
        public double CaloriesPer100g { get; set; }

        public virtual ICollection<Meal> Meals { get; set; }
    }
}
