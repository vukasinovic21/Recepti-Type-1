using Back.Domain.Exceptions;

namespace Back.Domain.ValueObjects
{
    public record IngredientId
    {
        public Guid Value { get; }
        private IngredientId(Guid value) => Value = value;

        public static IngredientId Of(Guid value)
        {
            ArgumentNullException.ThrowIfNull(value);
            if (value == Guid.Empty)
            {
                throw new DomainException("IngredientId cannot be empty");
            }

            return new IngredientId(value);
        }
    }
}
