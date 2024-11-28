using Back.Application.Likes.Commands.CheckLike;

namespace Back.API.Endpoints.Likes
{

    public record CheckLikeRequest(LikeDto Like);
    public record CheckLikeResponse(Boolean result);


    public class CheckLike : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/likes/check", async (CheckLikeRequest request, ISender sender) =>
            {
                var command = request.Adapt<CheckLikeCommand>();

                var result = await sender.Send(command);

                return Results.Created($"/likes/check/{result.result}", result);
            })
            .WithName("CheckLike")
            .Produces<CheckLikeResponse>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .WithSummary("Check Like")
            .WithDescription("Check Like")
            .RequireAuthorization();
        }
    }
}
