using Domain.Models;
using Microsoft.EntityFrameworkCore;
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

        }
    }
}
