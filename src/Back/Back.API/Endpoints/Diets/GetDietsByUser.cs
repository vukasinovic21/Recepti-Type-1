using Back.Application.Diets.Queries.GetDietsByUser;

namespace Back.API.Endpoints.Diets
{
    public record GetDietsByUserResponse(IEnumerable<DietDto> Diets);
    public class GetDietsByUser : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/diets/user/{userId}", async (Guid userId, ISender sender) =>
            {
                var result = await sender.Send(new GetDietsByUserQuery(userId));

                var response = result.Adapt<GetDietsByUserResponse>();

                return Results.Ok(response);
            })
            .WithName("GetDietsByUser")
            .Produces<GetDietsByUserResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Diets By User")
            .WithDescription("Get Diets By User"); ;
        }
    }
}
