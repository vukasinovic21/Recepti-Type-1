using Back.API;
using Back.Application;
using Back.Infrastructure;
using Back.Infrastructure.Data.Extentions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container

//Registrovanje servisa postujuci clean arhitekturu
builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddApiServices();

var app = builder.Build();

// Configure the HTTP request pipeline

app.UseApiServices();

if(app.Environment.IsDevelopment())
{
    await app.InitializeDatabaseAsync(); //uverava se da se izvrsava Update-Database komanda pri svakom pokretanju
}
app.Run();
