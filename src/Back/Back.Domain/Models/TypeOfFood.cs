using Back.Domain.Abstractions;
using Back.Domain.ValueObjects;

namespace Back.Domain.Models
{
    public class TypeOfFood : Entity<TypeOfFoodId>
    {
        public string TypeName { get; private set; } = default!;

        public static TypeOfFood Create(TypeOfFoodId id, string typename)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(typename);

            var typeoffood = new TypeOfFood
            {
                Id = id,
                TypeName = typename,
            };

            return typeoffood;
        }
    }
}
