using Domain.Models;
using FitPal_Models.Configuration;
using Microsoft.EntityFrameworkCore;
using oicar_ApiServices.AppSettings;
using Repository;

namespace oicar_ApiServices.Exstensions
{
    public static class ServiceExtension
    {
        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration) =>
            services.AddDbContext<RepositoryContext>(opts =>
            opts.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddHttpClient();
            services.AddScoped<IRepositoryManager, RepositoryManager>();
            services.AddSingleton<ISocialLoginManager, SocialLoginAuthManager>();

        }

        public static void AddConfiguration(this IServiceCollection services, IConfiguration configuration) =>
            services.Configure<Configuration>(configuration.GetSection(nameof(Configuration)));

    }
}
