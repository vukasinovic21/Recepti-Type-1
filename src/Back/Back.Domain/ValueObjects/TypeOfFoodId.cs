using Back.Domain.Exceptions;

namespace Back.Domain.ValueObjects
{
    public record TypeOfFoodId
    {
        public Guid Value { get; }
        private TypeOfFoodId(Guid value) => Value = value;

        public static TypeOfFoodId Of(Guid value)
        {
            ArgumentNullException.ThrowIfNull(value);
            if (value == Guid.Empty)
            {
                throw new DomainException("TypeOfFoodId cannot be empty");
            }

            return new TypeOfFoodId(value);
        }
    }
}
