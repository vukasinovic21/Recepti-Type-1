using Back.Application.Questions.Queries.GetQuestions;
using Back.Domain.Models;

namespace Back.API.Endpoints.Questions
{
    public record GetQuestionsResponse(IEnumerable<Question> Questions);
    public class GetQuestions : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/questions", async (ISender sender) =>
            {
                var result = await sender.Send(new GetQuestionsQuery());

                var response = result.Adapt<GetQuestionsResponse>();

                return Results.Ok(response);
            })
            .WithName("GetQuestions")
            .Produces<GetQuestionsResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Get Questions")
            .WithDescription("Get Questions"); ;
        }
    }
}
