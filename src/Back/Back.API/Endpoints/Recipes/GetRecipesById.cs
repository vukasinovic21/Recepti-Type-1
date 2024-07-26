using Back.Application.Recipes.Queries.GetRecipesById;
using Back.Application.Recipes.Queries.GetRecipesByName;

namespace Back.API.Endpoints.Recipes
{

    public record GetRecipesByIdResponse(IEnumerable<RecipeDto> Recipes);
    public class GetRecipesById : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/recipes/id{Id}", async (Guid Id, ISender sender) =>
            {
                var result = await sender.Send(new GetRecipesByIdQuery(Id));

                var response = result.Adapt<GetRecipesByIdResponse>();

                return Results.Ok(response);
            })
            .WithName("GetRecipesById")
            .Produces<GetRecipesByIdResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Recipes By Id")
            .WithDescription("Get Recipes By Id"); ;
        }
    }
}
