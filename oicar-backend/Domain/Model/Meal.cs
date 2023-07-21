using Domain.Models;

namespace Domain.Model
{
    public class Meal
    {
        public int Id { get; set; }
        public DateTime MealDate { get; set; }
        public int MealTypeId { get; set; }
        public virtual MealType MealType { get; set; }
        public int UserID { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Food> Foods { get; set; }
    }
}
