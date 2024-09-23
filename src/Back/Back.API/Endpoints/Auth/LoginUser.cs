using Back.Application.Auth.Queries.LoginUser;

namespace Back.API.Endpoints.Auth
{
    public record LoginUserRequest(LoginUserDto User);
    public record LoginUserResponse(string jwt);


    public class LoginUser : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/auth/login", async (LoginUserRequest request, ISender sender) =>
            {
                var command = request.Adapt<LoginUserQuery>();

                var result = await sender.Send(command);

                var response = result.Adapt<LoginUserResponse>();

                return Results.Created($"/auth/login/{response.jwt}", response);
            })
            .WithName("LoginUser")
            .Produces<LoginUserResponse>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .WithSummary("Login User")
            .WithDescription("Login User");
        }
    }
}
