using Back.Application.Diets.Commands.CreateDiet;

namespace Back.API.Endpoints.Diets
{
    public record CreateDietRequest(DietDto Diet);
    public record CreateDietResponse(Guid Id);


    public class CreateDiet : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/diets", async (CreateDietRequest request, ISender sender) =>
            {
                var command = request.Adapt<CreateDietCommand>();

                var result = await sender.Send(command);

                var response = result.Adapt<CreateDietResponse>();

                return Results.Created($"/diets/{response.Id}", response);
            })
            .WithName("CreateDiet")
            .Produces<CreateDietResponse>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .WithSummary("Create Diet")
            .WithDescription("Create Diet")
            .RequireAuthorization();
        }
    }
}
