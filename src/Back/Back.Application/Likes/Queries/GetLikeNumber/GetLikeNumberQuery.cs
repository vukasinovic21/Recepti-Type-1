namespace Back.Application.Likes.Queries.GetLikeNumber
{
    public record GetLikeNumberQuery(Guid Id)
      : IQuery<GetLikeNumberResult>;

    public record GetLikeNumberResult(int number);
}
