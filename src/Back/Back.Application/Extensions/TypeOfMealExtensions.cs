namespace Back.Application.Extensions
{
    public static class TypeOfMealExtensions
    {
        public static IEnumerable<TypeOfMealDto> ToTypesOfMealDtotoList(this IEnumerable<TypeOfMeal> typesofmeal)
        {
            return typesofmeal.Select(tom => new TypeOfMealDto(
                    Id: tom.Id.Value,
                    TypeName: tom.TypeName
                    ));
        }
    }
}
