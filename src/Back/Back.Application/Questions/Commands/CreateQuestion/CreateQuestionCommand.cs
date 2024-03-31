using FluentValidation;

namespace Back.Application.Questions.Commands.CreateQuestion
{
    public record CreateQuestionCommand(QuestionDto Question)
        : ICommand<CreateQuestionResult>;

    public record CreateQuestionResult(Guid Id);

    public class CreateQuestionCommandValidator : AbstractValidator<CreateQuestionCommand>
    {
        public CreateQuestionCommandValidator()
        {
            RuleFor(x => x.Question.QuestionName).NotEmpty().WithMessage("Question text is required");
        }
    }
}
