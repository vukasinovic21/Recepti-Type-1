using Back.Application.Diets.Queries.GetDietsByName;
using Back.Domain.Models;
using Back.Domain.ValueObjects;
using System.Linq;

namespace Back.Application.Diets.Queries.GetDietsById
{
    public class GetDietsByIdHandler(IApplicationDbContext dbContext)
        : IQueryHandler<GetDietsByIdQuery, GetDietsByIdResult>
    {
        public async Task<GetDietsByIdResult> Handle(GetDietsByIdQuery query, CancellationToken cancellationToken)
        {
            var diets = await dbContext.Diets
                .Include(d => d.PlanOfDiets)
                .Where(d => d.Id == DietId.Of(query.Id))
                .OrderBy(d => d.CreatedAt)
                .ToListAsync(cancellationToken);

            var recipeIds = diets
                .SelectMany(d => d.PlanOfDiets)
                .Select(pod => pod.RecipeId)
                .Distinct()
                .ToList();

            var recipes = await dbContext.Recipes
                .Where(r => recipeIds.Contains(r.Id))
                .ToListAsync(cancellationToken);

            var recipeDict = recipes.ToDictionary(r => r.Id, r => r);

            List<DietInfoDto> lista = new List<DietInfoDto>();

            foreach (var diet in diets)
            {
                var planOfDietsDto = diet.PlanOfDiets
                    .Select(pod =>
                    {
                        var recipe = recipeDict.TryGetValue(pod.RecipeId, out var rec) ? rec : null;
                        return new PlanOfDietInfoDto(
                            pod.DietId.Value,
                            pod.RecipeId.Value,
                            pod.TypeOfMealId.Value,
                            pod.DayOfWeek,
                            recipe!.RecipeName,
                            recipe.Picture
                        );
                    })
                    .OrderBy(dto => dto.DayOfWeek)
                    .ThenBy(dto => dto.TypeOfMealId)
                    .ToList();

                lista.Add(new DietInfoDto(
                    Id: diet.Id.Value,
                    UserId: diet.UserId.Value,
                    DietName: diet.DietName,
                    NutritionId: diet.NutritionId.Value,
                    CreatedAt: diet.CreatedAt.Value,
                    PlanOfDiets: planOfDietsDto
                ));
            }

            return new GetDietsByIdResult(lista);
        }

    }
}
