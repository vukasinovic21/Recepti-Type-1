using Back.Domain.Exceptions;

namespace Back.Domain.ValueObjects
{
    public record RecipeItemId
    {
        public Guid Value { get; }
        private RecipeItemId(Guid value) => Value = value;

        public static RecipeItemId Of(Guid value)
        {
            ArgumentNullException.ThrowIfNull(value);
            if (value == Guid.Empty)
            {
                throw new DomainException("RecipeItemId cannot be empty");
            }

            return new RecipeItemId(value);
        }
    }
}
