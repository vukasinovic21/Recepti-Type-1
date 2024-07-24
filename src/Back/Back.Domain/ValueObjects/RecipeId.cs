using Back.Domain.Exceptions;

namespace Back.Domain.ValueObjects
{
    public record RecipeId
    {
        public Guid Value { get; }
        private RecipeId(Guid value) => Value = value;

        public static RecipeId Of(Guid value)
        {
            ArgumentNullException.ThrowIfNull(value);
            if (value == Guid.Empty)
            {
                throw new DomainException("RecipeId cannot be empty");
            }

            return new RecipeId(value);
        }
    }
}
