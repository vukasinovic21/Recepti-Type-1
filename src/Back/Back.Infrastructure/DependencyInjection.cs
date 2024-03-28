using Back.Infrastructure.Data;
using Back.Infrastructure.Data.Interceptors;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Back.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureServices
            (this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("Database");

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.AddInterceptors(new AuditableEntityInterceptor());
                options.UseNpgsql(connectionString); //konekcija za postgresql
            });
            //services.AddScoped<IApplicationDbContext, ApplicationDbContext>();

            return services;
        }
    }
}
