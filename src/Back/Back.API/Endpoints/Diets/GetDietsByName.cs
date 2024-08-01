using Back.Application.Diets.Queries.GetDietsByName;

namespace Back.API.Endpoints.Diets
{
    public record GetDietsByNameResponse(IEnumerable<DietDto> Diets);
    public class GetDietsByName : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/diets/name/{dietName}", async (string dietName, ISender sender) =>
            {
                var result = await sender.Send(new GetDietsByNameQuery(dietName));

                var response = result.Adapt<GetDietsByNameResponse>();

                return Results.Ok(response);
            })
            .WithName("GetDietsByName")
            .Produces<GetDietsByNameResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Diets By Name")
            .WithDescription("Get Diets By Name"); ;
        }
    }
}
