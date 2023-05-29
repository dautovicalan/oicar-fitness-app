namespace FitPal_Models.Dto
{

    public class MealDto
    {
        public int Id { get; set; }
        public MealTypeDto MealType { get; set; }
        public List<FoodDto> Foods { get; set; }

    }

    public class MealTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    
}
