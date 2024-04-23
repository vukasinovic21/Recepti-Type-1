using Back.Application.TypesOfFood.Commands.CreateTypeOfFood;

namespace Back.API.Endpoints.TypesOfFood
{
    public record CreateTypeOfFoodRequest(TypeOfFoodDto TypeOfFood);
    public record CreateTypeOfFoodResponse(Guid Id);


    public class CreateTypeOfFood : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/foodtype", async (CreateTypeOfFoodRequest request, ISender sender) =>
            {
                var command = request.Adapt<CreateTypeOfFoodCommand>();

                var result = await sender.Send(command);

                var response = result.Adapt<CreateTypeOfFoodResponse>();

                return Results.Created($"/foodtype/{response.Id}", response);
            })
            .WithName("CreateTypeOfFood")
            .Produces<CreateTypeOfFoodResponse>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .WithSummary("Create Type Of Food")
            .WithDescription("Create Type Of Food");
        }
    }
}
