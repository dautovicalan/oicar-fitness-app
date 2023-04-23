using FitPal_Models.Configuration;
using Google.Apis.Auth;
using Microsoft.Extensions.Options;

namespace oicar_ApiServices.AppSettings
{

    public interface ISocialLoginManager
    {
        Task<GoogleJsonWebSignature.Payload?> GoogleAuthentication(string accessToken);
    }


    public class SocialLoginAuthManager : ISocialLoginManager
    {
        private readonly IOptions<Configuration> _config;
        private HttpClient _httpClient;

        public SocialLoginAuthManager(IOptions<Configuration> config, IHttpClientFactory factory)
        {
            _config = config;
            _httpClient = factory.CreateClient();
        }

        public async Task<GoogleJsonWebSignature.Payload?> GoogleAuthentication(string accessToken)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string>()
                    {
                    _config.Value.SocialLoginConfiguration.GoogleConfiguration.IOSClientId,
                    _config.Value.SocialLoginConfiguration.GoogleConfiguration.WebClientId
                    }
                };
                GoogleJsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(accessToken, settings);

                return payload;
            }
            catch (Exception ex)
            {

                return null;
            }
        }
    }
}
