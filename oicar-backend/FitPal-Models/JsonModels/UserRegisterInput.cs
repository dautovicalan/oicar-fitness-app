namespace FitPal_Models.JsonModels
{
    public class UserRegisterInput
    {
        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string? Name { get; set; }

        public string? Surname { get; set; }

        public bool? Newsletter { get; set; }

    }
}
