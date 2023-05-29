namespace FitPal_Models.JsonModels
{
    public class CreateUserMealInput
    {
        public int IdUser { get; set; }
        public string Date { get; set; }
        public int MealTypeId { get; set; }

        public DateTime ParsedDate
        {
            get { return DateTime.Parse(Date); }
        }
    }
}
