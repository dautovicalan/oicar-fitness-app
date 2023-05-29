namespace Domain.Model
{
    public class MealType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Meal> Meals { get; set; }
    }
}
