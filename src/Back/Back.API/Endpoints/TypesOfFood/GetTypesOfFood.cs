using Back.Application.TypesOfFood.Queries.GetTypesOfFood;
using Back.Domain.Models;

namespace Back.API.Endpoints.TypesOfFood
{
    public record GetTypesOfFoodResponse(IEnumerable<TypeOfFoodDto> TypesOfFood);
    public class GetTypesOfFood : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/typesoffood", async (ISender sender) =>
            {
                var result = await sender.Send(new GetTypesOfFoodQuery());

                var response = result.Adapt<GetTypesOfFoodResponse>();

                return Results.Ok(response);
            })
            .WithName("GetTypesOfFood")
            .Produces<GetTypesOfFoodResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Types Of Food")
            .WithDescription("Get Types Of Food"); ;
        }
    }
}
