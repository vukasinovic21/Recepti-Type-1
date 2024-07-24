using BuildingBlocks.Exceptions;

namespace Back.Application.Exceptions
{
    public class LikeNotFoundException : NotFoundException
    {
        public LikeNotFoundException(Guid id) : base("Like", id)
        {
        }
    }
}
