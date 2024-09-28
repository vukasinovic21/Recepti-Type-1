using Back.Application.Recipes.Commands.CreateRecipe;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Back.API.Endpoints.Recipes
{
    public class AddPicture : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/recipes/picture", async (IFormFile picture) =>
            {
                var currentDirectory = Directory.GetCurrentDirectory();
                var parentDirectory = Directory.GetParent(currentDirectory).Parent.FullName; // K:\\Recepti-Type-1\\src\\Front
                var uploadsFolder = Path.Combine(parentDirectory, "Front", "src", "assets", "images");

                var filePath = Path.Combine(uploadsFolder, picture.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await picture.CopyToAsync(stream);
                }

                var response = "Uspesno dodata slika uz recept.";
                return Results.Created("/recipes/picture", response);
            }).DisableAntiforgery()
            .WithName("AddPicture")
            .Produces<CreateRecipeResponse>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .WithSummary("Add picture with recipe")
            .WithDescription("Add picture with recipe");
        }
    }
}
