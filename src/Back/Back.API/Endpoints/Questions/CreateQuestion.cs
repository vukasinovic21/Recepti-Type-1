using Back.Application.Questions.Commands.CreateQuestion;

namespace Back.API.Endpoints.Questions
{
    public record CreateQuestionRequest(QuestionDto Question);
    public record CreateQuestionResponse(Guid Id);


    public class CreateQuestion : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/question", async (CreateQuestionRequest request, ISender sender) =>
            {
                var command = request.Adapt<CreateQuestionCommand>();

                var result = await sender.Send(command);

                var response = result.Adapt<CreateQuestionResponse>();

                return Results.Created($"/question/{response.Id}", response);
            })
            .WithName("CreateQuestion")
            .Produces<CreateQuestionResponse>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .WithSummary("Create Question")
            .WithDescription("Create Question")
            .RequireAuthorization(); //Trebalo bi Admin samo
        }
    }
}
