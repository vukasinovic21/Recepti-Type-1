using Back.Domain.Exceptions;

namespace Back.Domain.ValueObjects
{
    public record PlanOfDietId
    {
        public Guid Value { get; }
        private PlanOfDietId(Guid value) => Value = value;

        public static PlanOfDietId Of(Guid value)
        {
            ArgumentNullException.ThrowIfNull(value);
            if (value == Guid.Empty)
            {
                throw new DomainException("PlanOfDietId cannot be empty");
            }

            return new PlanOfDietId(value);
        }
    }
}
