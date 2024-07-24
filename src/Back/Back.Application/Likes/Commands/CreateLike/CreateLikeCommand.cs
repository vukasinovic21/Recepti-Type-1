using FluentValidation;

namespace Back.Application.Likes.Commands.CreateLike
{
  
    public record CreateLikeCommand(LikeDto Like)
        : ICommand<CreateLikeResult>;

    public record CreateLikeResult(Guid Id);

    public class CreateLikeCommandValidator : AbstractValidator<CreateLikeCommand>
    {
        public CreateLikeCommandValidator()
        {
            RuleFor(x => x.Like.RecipeId).NotEmpty().WithMessage("RecipeId is required");
            RuleFor(x => x.Like.UserId).NotNull().WithMessage("UserId is required");
        }
    }

}
