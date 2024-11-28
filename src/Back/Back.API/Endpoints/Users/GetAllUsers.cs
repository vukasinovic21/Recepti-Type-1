using Back.Application.Users.Queries.GetAllUsers;

namespace Back.API.Endpoints.Users
{
    public record GetAllUsersResponse(IEnumerable<UserDto> Users);
    public class GetAllUsers : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/users", async (ISender sender) =>
            {
                var result = await sender.Send(new GetAllUsersQuery());

                var response = result.Adapt<GetAllUsersResponse>();
                return Results.Ok(response);
            })
            .WithName("GetAllUsers")
            .Produces<GetAllUsersResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get All Users")
            .WithDescription("Get All Users");
        }
    }
}
