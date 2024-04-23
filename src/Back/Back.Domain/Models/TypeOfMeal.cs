using Back.Domain.Abstractions;
using Back.Domain.ValueObjects;

namespace Back.Domain.Models
{
    public class TypeOfMeal : Entity<TypeOfMealId>
    {
        public string TypeName { get; private set; } = default!;

        public static TypeOfMeal Create(TypeOfMealId id, string typename)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(typename);

            var typeofmeal = new TypeOfMeal
            {
                Id = id,
                TypeName = typename,
            };

            return typeofmeal;
        }
    }
}
