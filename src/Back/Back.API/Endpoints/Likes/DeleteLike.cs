using Back.Application.Likes.Commands.DeleteLike;

namespace Back.API.Endpoints.Likes
{
    public record DeleteLikeResponse(bool IsSuccess);
    public class DeleteLike : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapDelete("/likes/{id}", async (Guid Id, ISender sender) =>
            {
                var result = await sender.Send(new DeleteLikeCommand(Id));

                var response = result.Adapt<DeleteLikeResponse>();

                return Results.Ok(response);
            })
            .WithName("DeleteLike")
            .Produces<DeleteLikeResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Delete Like")
            .WithDescription("Delete ReLikecipe"); ;
        }
    }
}
