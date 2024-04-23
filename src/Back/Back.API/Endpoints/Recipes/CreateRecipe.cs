using Back.Application.Recipes.Commands.CreateRecipe;

namespace Back.API.Endpoints.Recipes
{

    public record CreateRecipeRequest(RecipeDto Recipe);
    public record CreateRecipeResponse(Guid Id);


    public class CreateRecipe : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/recipes", async (CreateRecipeRequest request, ISender sender) =>
            {
                var command = request.Adapt<CreateRecipeCommand>();

                var result = await sender.Send(command);

                var response = result.Adapt<CreateRecipeResponse>();

                return Results.Created($"/recipes/{response.Id}", response);
            })
            .WithName("CreateRecipe")
            .Produces<CreateRecipeResponse>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .WithSummary("Create Recipe")
            .WithDescription("Create Recipe");
        }
    }
}
