using FluentValidation;

namespace Back.Application.Likes.Commands.DeleteLike
{
    public record DeleteLikeCommand(Guid LikeId)
        : ICommand<DeleteLikeResult>;

    public record DeleteLikeResult(bool IsSuccess);

    public class DeleteLikeCommandValidator : AbstractValidator<DeleteLikeCommand>
    {
        public DeleteLikeCommandValidator()
        {
            RuleFor(x => x.LikeId).NotEmpty().WithMessage("LikeId is required");
        }
    }
}
