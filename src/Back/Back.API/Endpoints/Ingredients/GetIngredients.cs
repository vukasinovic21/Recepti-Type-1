
using Back.Application.Ingredients.Queries.GetIngredients;

namespace Back.API.Endpoints.Ingredients
{
    public record GetIngredientsResponse(IEnumerable<IngredientDto> Ingredients);
    public class GetIngredients : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/ingredients", async (ISender sender) =>
            {
                var result = await sender.Send(new GetIngredientsQuery());

                var response = result.Adapt<GetIngredientsResponse>();

                return Results.Ok(response);
            })
            .WithName("GetIngredients")
            .Produces<GetIngredientsResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Ingredients")
            .WithDescription("Get Ingredients"); ;
        }
    }
}
