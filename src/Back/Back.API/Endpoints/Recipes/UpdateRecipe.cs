using Back.Application.Recipes.Commands.UpdateRecipe;

namespace Back.API.Endpoints.Recipes
{

    public record UpdateRecipeRequest(RecipeDto Recipe);
    public record UpdateRecipeResponse(bool IsSuccess);
    public class UpdateRecipe : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPut("/recipes", async (UpdateRecipeRequest request, ISender sender) =>
            {
                var command = request.Adapt<UpdateRecipeCommand>();

                var result = await sender.Send(command);

                var response = result.Adapt<UpdateRecipeResponse>();

                return Results.Ok(response);
            })
            .WithName("UpdateRecipe")
            .Produces<CreateRecipeResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .WithSummary("Update Recipe")
            .WithDescription("Update Recipe"); ;
        }
    }
}
