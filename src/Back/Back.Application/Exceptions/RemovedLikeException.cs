using BuildingBlocks.Exceptions;

namespace Back.Application.Exceptions
{
    public class RemovedLikeException : NotFoundException
    {
        public RemovedLikeException(string message) : base(message)
        {
        }
    }
}
