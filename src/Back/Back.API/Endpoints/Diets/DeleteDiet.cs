using Back.Application.Diets.Commands.DeleteDiets;

namespace Back.API.Endpoints.Diets
{
    public record DeleteDietResponse(bool IsSuccess);
    public class DeleteDiet : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapDelete("/diets/{id}", async (Guid Id, ISender sender) =>
            {
                var result = await sender.Send(new DeleteDietCommand(Id));

                var response = result.Adapt<DeleteDietResponse>();

                return Results.Ok(response);
            })
            .WithName("DeleteDiet")
            .Produces<DeleteDietResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Delete Diet")
            .WithDescription("Delete Diet")
            .RequireAuthorization();
        }
    }
}
