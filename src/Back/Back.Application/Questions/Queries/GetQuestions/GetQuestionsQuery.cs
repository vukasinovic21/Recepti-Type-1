namespace Back.Application.Questions.Queries.GetQuestions
{
    public record GetQuestionsQuery()
        : IQuery<GetQuestionsResult>;

    public record GetQuestionsResult(IEnumerable<Question> Questions);
}
