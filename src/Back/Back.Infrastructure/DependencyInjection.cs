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

            /*
            Add services to the container.
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(connectionString)); //ovo je konekcija za sql server, treba promeniti da odgovara postgreSql
            */

            return services;
        }
    }
}
