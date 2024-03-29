using Microsoft.EntityFrameworkCore;

namespace Back.Application.Data
{
    public interface IApplicationDbContext
    {
        DbSet<User> Users { get; }
        DbSet<Ingredient> Ingredients { get; }
        DbSet<Recipe> Recipes { get; }
        DbSet<RecipeItem> RecipeItems { get; }
        DbSet<Question> Questions { get; }
        DbSet<TypeOfFood> TypesOfFood { get; }
        DbSet<Like> Likes { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
