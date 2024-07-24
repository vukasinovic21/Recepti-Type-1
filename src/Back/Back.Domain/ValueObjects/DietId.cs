using Back.Domain.Exceptions;

namespace Back.Domain.ValueObjects
{
    public record DietId
    {
        public Guid Value { get; }
        private DietId(Guid value) => Value = value;

        public static DietId Of(Guid value)
        {
            ArgumentNullException.ThrowIfNull(value);
            if (value == Guid.Empty)
            {
                throw new DomainException("DietId cannot be empty");
            }

            return new DietId(value);
        }
    }
}
