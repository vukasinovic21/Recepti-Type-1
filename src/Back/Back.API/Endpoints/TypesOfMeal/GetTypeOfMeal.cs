using Back.Application.TypesOfMeal.Queries.GetTypesOfMeal;

namespace Back.API.Endpoints.TypesOfMeal
{
    public record GetTypesOfMealResponse(IEnumerable<TypeOfMealDto> TypeOfMeal);
    public class GetTypeOfMeal : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/typesofmeal", async (ISender sender) =>
            {
                var result = await sender.Send(new GetTypesOfMealQuery());
                //var response = result.Adapt<GetTypesOfMealResponse>();
                var response = result.TypesOfMeal.ToList().Adapt<List<TypeOfMealDto>>();

                return Results.Ok(response);
            })
            .WithName("GetTypeOfMeal")
            .Produces<GetTypesOfMealResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Types Of Meal")
            .WithDescription("Get Types Of Meal"); 
        }
    }
}
