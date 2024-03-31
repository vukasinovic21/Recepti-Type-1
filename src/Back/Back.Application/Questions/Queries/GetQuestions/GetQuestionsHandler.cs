namespace Back.Application.Questions.Queries.GetQuestions
{
    public class GetQuestionsHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetQuestionsQuery, GetQuestionsResult>
    {
        public async Task<GetQuestionsResult> Handle(GetQuestionsQuery query, CancellationToken cancellationToken)
        {

            List<Question> questions = await dbContext.Questions
                                .OrderBy(q => q.QuestionName)
                                .ToListAsync(cancellationToken);

            return new GetQuestionsResult(questions);
        }
    }
}
