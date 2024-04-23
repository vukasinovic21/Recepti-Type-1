using Back.Domain.Exceptions;

namespace Back.Domain.ValueObjects
{
    public record TypeOfMealId
    {
        public Guid Value { get; }
        private TypeOfMealId(Guid value) => Value = value;

        public static TypeOfMealId Of(Guid value)
        {
            ArgumentNullException.ThrowIfNull(value);
            if (value == Guid.Empty)
            {
                throw new DomainException("TypeOfMealId cannot be empty");
            }

            return new TypeOfMealId(value);
        }
    }
}
