using Back.Application.Recipes.Commands.DeleteRecipe;

namespace Back.API.Endpoints.Recipes
{

    public record DeleteRecipeResponse(bool IsSuccess);
    public class DeleteRecipe : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapDelete("/recipes/{id}", async (Guid Id, ISender sender) =>
            {
                var result = await sender.Send(new DeleteRecipeCommand(Id));

                var response = result.Adapt<DeleteRecipeResponse>();

                return Results.Ok(response);
            })
            .WithName("DeleteRecipe")
            .Produces<CreateRecipeResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Delete Recipe")
            .WithDescription("Delete Recipe"); ;
        }
    }
}
