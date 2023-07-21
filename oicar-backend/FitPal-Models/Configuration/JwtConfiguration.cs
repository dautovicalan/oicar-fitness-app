namespace FitPal_Models.Configuration
{
    public class JwtConfiguration
    {
        public const string Section  = "JwtConfiguration";
        public string ValidIssuer { get; set; }
        public string ValidAudience { get; set; }
        public string SecretKey { get; set; }
    }
}
