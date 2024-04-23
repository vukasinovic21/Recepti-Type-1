using Back.Domain.Models;
using Back.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Back.Infrastructure.Data.Configurations
{
    public class RecipeItemConfiguration : IEntityTypeConfiguration<RecipeItem>
    {
        public void Configure(EntityTypeBuilder<RecipeItem> builder)
        {
            builder.HasKey(ri => ri.Id);
            builder.Property(ri => ri.Id).HasConversion(
                recipeItemId => recipeItemId.Value,
                dbId => RecipeItemId.Of(dbId));

            builder.HasOne<Ingredient>()
                .WithMany()
                .HasForeignKey(ri => ri.IngredientId);

            builder.Property(ri => ri.Quantity).IsRequired();
        }
    }
}
