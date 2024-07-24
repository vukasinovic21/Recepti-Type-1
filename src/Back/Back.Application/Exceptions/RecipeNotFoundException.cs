using BuildingBlocks.Exceptions;

namespace Back.Application.Exceptions
{
    public class RecipeNotFoundException : NotFoundException
    {
        public RecipeNotFoundException(Guid id) : base("Recipe", id) 
        {
        }
    }
}
