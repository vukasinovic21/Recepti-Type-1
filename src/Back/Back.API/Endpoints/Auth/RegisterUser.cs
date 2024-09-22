using Back.Application.Auth.Commands.RegisterUser;

namespace Back.API.Endpoints.Auth
{
    public record RegisterUserRequest(RegisterUserDto User);
    public record RegisterUserResponse(Guid Id);


    public class RegisterUser : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/auth/register", async (RegisterUserRequest request, ISender sender) =>
            {
                var command = request.Adapt<RegisterUserCommand>();

                var result = await sender.Send(command);

                var response = result.Adapt<RegisterUserResponse>();

                return Results.Created($"/auth/register/{response.Id}", response);
            })
            .WithName("RegisterUser")
            .Produces<RegisterUserResponse>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .WithSummary("Register User")
            .WithDescription("Register User");
        }
    }
}
