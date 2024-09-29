using Back.Application.Likes.Commands.CheckLike;
using Back.Application.Likes.Queries.GetLikeNumber;
using MediatR;

namespace Back.API.Endpoints.Likes
{

    public record GetLikeNumberResponse(int number);
    public class GetLikeNumber : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/likes/recipe/{Id}", async (Guid Id, ISender sender) =>
            {
                var result = await sender.Send(new GetLikeNumberQuery(Id));

                //var response = result.Adapt<GetLikeNumberResponse>();

                return Results.Ok(result);
            })
            .WithName("GetLikeNumber")
            .Produces<GetLikeNumberResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Like Number")
            .WithDescription("Get Like Number"); ;
        }
    }
}
