using Back.Application.Diets.Queries.GetDietsById;

namespace Back.API.Endpoints.Diets
{

    public record GetDietsByIdResponse(IEnumerable<DietInfoDto> Diets);
    public class GetDietById : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/diets/id/{dietId}", async (Guid dietId, ISender sender) =>
            {
                var result = await sender.Send(new GetDietsByIdQuery(dietId));

                var response = result.Adapt<GetDietsByIdResponse>();

                return Results.Ok(response);
            })
            .WithName("GetDietById")
            .Produces<GetDietsByIdResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Diet By Id")
            .WithDescription("Get Diet By Id")
            .RequireAuthorization(); ; 
        }
    }
}
