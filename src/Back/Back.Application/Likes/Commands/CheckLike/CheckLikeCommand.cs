using FluentValidation;

namespace Back.Application.Likes.Commands.CheckLike
{
    public record CheckLikeCommand(LikeDto Like)
        : ICommand<CheckLikeResult>;

    public record CheckLikeResult(Boolean result);

    public class CheckLikeCommandValidator : AbstractValidator<CheckLikeCommand>
    {
        public CheckLikeCommandValidator()
        {
            RuleFor(x => x.Like.RecipeId).NotEmpty().WithMessage("RecipeId is required");
            RuleFor(x => x.Like.UserId).NotNull().WithMessage("UserId is required");
        }
    }
}
