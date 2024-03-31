namespace Back.Application.Questions.Commands.CreateQuestion
{
    public class CreateQuestionHandler(IApplicationDbContext dbContext)
        : ICommandHandler<CreateQuestionCommand, CreateQuestionResult>
    {
        public async Task<CreateQuestionResult> Handle(CreateQuestionCommand command, CancellationToken cancellationToken)
        {
            //Create Question entity from command object
            //save to database
            //return result

            var question = CreateNewQuestion(command.Question);

            dbContext.Questions.Add(question);
            await dbContext.SaveChangesAsync(cancellationToken);

            return new CreateQuestionResult(question.Id.Value);
        }

        private Question CreateNewQuestion(QuestionDto questionDto)
        {
            var newQuestion = Question.Create(
                id: QuestionId.Of(Guid.NewGuid()),
                questionname: questionDto.QuestionName
                );

            return newQuestion;
        }
    }
}
