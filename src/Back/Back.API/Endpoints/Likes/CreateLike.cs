using Back.Application.Likes.Commands.CreateLike;

namespace Back.API.Endpoints.Likes
{
    public record CreateLikeRequest(LikeDto Like);
    public record CreateLikeResponse(Guid Id);


    public class CreateLike : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/likes", async (CreateLikeRequest request, ISender sender) =>
            {
                var command = request.Adapt<CreateLikeCommand>();

                var result = await sender.Send(command);

                var response = result.Adapt<CreateLikeResponse>();

                return Results.Created($"/likes/{response.Id}", response);
            })
            .WithName("CreateLike")
            .Produces<CreateLikeResponse>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .WithSummary("Create Like")
            .WithDescription("Create Like");
        }
    }
}
