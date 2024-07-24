namespace Back.Application.Extensions
{
    public static class QuestionsExtensions
    {
        public static IEnumerable<QuestionDto> ToQuestionsDtotoList(this IEnumerable<Question> questions)
        {
            return questions.Select(question => new QuestionDto(
                    Id: question.Id.Value,
                    QuestionName: question.QuestionName
                    ));
        }
    }
}
