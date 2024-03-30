using Back.Application.Recipes.Queries.GetRecipesByUser;

namespace Back.API.Endpoints.Recipes
{
    public record GetRecipesByUserResponse(IEnumerable<RecipeDto> Recipes);
    public class GetRecipesByUser : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/recipes/user/{userId}", async (Guid userId, ISender sender) =>
            {
                var result = await sender.Send(new GetRecipesByUserQuery(userId));

                var response = result.Adapt<GetRecipesByUserResponse>();

                return Results.Ok(response);
            })
            .WithName("GetRecipesByUser")
            .Produces<CreateRecipeResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Recipes By User")
            .WithDescription("Get Recipes By User"); ;
        }
    }
}
