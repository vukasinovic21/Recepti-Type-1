using Back.Domain.Exceptions;

namespace Back.Domain.ValueObjects
{
    public record LikeId
    {
        public Guid Value { get; }
        private LikeId(Guid value) => Value = value;

        public static LikeId Of(Guid value)
        {
            ArgumentNullException.ThrowIfNull(value);
            if (value == Guid.Empty)
            {
                throw new DomainException("LikeId cannot be empty");
            }

            return new LikeId(value);
        }
    }
}
