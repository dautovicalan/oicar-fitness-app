namespace FitPal_Models.Configuration
{
    public class GoogleConfiguration
    {
        public const string Section = nameof(GoogleConfiguration);
        public string IOSClientId { get; set; } = null!;
        public string WebClientId { get; set; } = null!;
        public string ClientSecret { get; set; } = null!;
    }
}
