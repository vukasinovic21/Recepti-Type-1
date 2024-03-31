namespace Back.Application.Extensions
{
    public static class TypeOfFoodExtenstions
    {
        public static IEnumerable<TypeOfFoodDto> ToTypesOfFoodDtotoList(this IEnumerable<TypeOfFood> typesoffood)
        {
            return typesoffood.Select(tof => new TypeOfFoodDto(
                    Id: tof.Id.Value,
                    TypeName: tof.TypeName
                    ));
        }
    }
}
