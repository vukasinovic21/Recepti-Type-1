using Back.Application.Users.Queries.GetUserById;

namespace Back.API.Endpoints.Users
{
    public record GetUserByIdResponse(IEnumerable<UserDto> User);
    public class GetUserById : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/users/id/{Id}", async (Guid Id, ISender sender) =>
            {
                var result = await sender.Send(new GetUserByIdQuery(Id));

                var response = result.Adapt<GetUserByIdResponse>();
                return Results.Ok(response);
            })
            .WithName("GetUserById")
            .Produces<GetUserByIdResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get User By Id")
            .WithDescription("Get User By Id"); ;
        }
    }
}
