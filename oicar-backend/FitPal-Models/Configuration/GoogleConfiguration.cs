namespace FitPal_Models.Configuration
{
    public class GoogleConfiguration
    {
        public const string Section = nameof(GoogleConfiguration);
        public string GoogleClientId { get; set; } = null!;
        public string ClientSecret { get; set; } = null!;
    }
}
