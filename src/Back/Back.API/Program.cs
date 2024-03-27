using Back.API;
using Back.Application;
using Back.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container

//Ubacivanje svakog DependencyInjection fajla posebno
builder.Services
    .AddApplicationServices()
    .AddInfrastructureServices(builder.Configuration)
    .AddApiServices();

var app = builder.Build();

// Configure the HTTP request pipeline

app.Run();
