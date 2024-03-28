using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Back.Infrastructure.Data.Extentions
{
    public static class DatabaseExtentions
    {
        public static async Task InitializeDatabaseAsync(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            context.Database.MigrateAsync().GetAwaiter().GetResult();

            await SeedAsync(context);
        }

        private static async Task SeedAsync(ApplicationDbContext context)
        {
            await SeedUserAsync(context);
            await SeedIngredientAsync(context); //mozda da se popunjava iz nekog fajla ?
            await SeedQuestionAsync(context);
            await SeedTypeOfFoodAsync(context);
            await SeedRecipeItemAsync(context);
            //await SeedRecipeAsync(context); //mozda da se popunjava iz nekog fajla vec postojecih 
            //await SeedLikeAsync(context);
        }

        private static async Task SeedUserAsync(ApplicationDbContext context)//ako je prazna USERS tabela da se popuni na odgovarajuci nacin
        {
            if(!await context.Users.AnyAsync())
            {
                await context.Users.AddRangeAsync(InitialData.Users);
                await context.SaveChangesAsync();
            }
        }
        private static async Task SeedIngredientAsync(ApplicationDbContext context)//ako je prazna INGREDIENTS tabela da se popuni na odgovarajuci nacin
        {
            if (!await context.Ingredients.AnyAsync())
            {
                await context.Ingredients.AddRangeAsync(InitialData.Ingredients);
                await context.SaveChangesAsync();
            }
        }
        private static async Task SeedQuestionAsync(ApplicationDbContext context)//ako je prazna QUESTIONS tabela da se popuni na odgovarajuci nacin
        {
            if (!await context.Questions.AnyAsync())
            {
                await context.Questions.AddRangeAsync(InitialData.Questions);
                await context.SaveChangesAsync();
            }
        }
        private static async Task SeedTypeOfFoodAsync(ApplicationDbContext context)//ako je prazna TYPESOFFOOD tabela da se popuni na odgovarajuci nacin
        {
            if (!await context.TypesOfFood.AnyAsync())
            {
                await context.TypesOfFood.AddRangeAsync(InitialData.TypesOfFood);
                await context.SaveChangesAsync();
            }
        }
        private static async Task SeedRecipeItemAsync(ApplicationDbContext context)//popunjava RECIPES and RECIPEITEMS
        {
            if (!await context.Recipes.AnyAsync())
            {
                await context.Recipes.AddRangeAsync(InitialData.RecipeWithItems);
                await context.SaveChangesAsync();
            }
        }
    }
}
