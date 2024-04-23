using Back.Domain.Models;
using Back.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Back.Infrastructure.Data.Configurations
{
    public class RecipeConfiguration : IEntityTypeConfiguration<Recipe>
    {
        public void Configure(EntityTypeBuilder<Recipe> builder)
        {
            builder.HasKey(r => r.Id);
            builder.Property(r => r.Id).HasConversion(
                recipeId => recipeId.Value,
                dbId => RecipeId.Of(dbId));

            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey(r => r.UserId)
                .IsRequired();

            builder.HasOne<TypeOfFood>()
                .WithMany()
                .HasForeignKey(r => r.TypeOfFoodId)
                .IsRequired();

            builder.HasMany(r => r.RecipeItems)
                .WithOne()
                .HasForeignKey(ri => ri.RecipeId);

            builder.Property(r => r.RecipeName).HasMaxLength(256).IsRequired();
            builder.Property(r => r.Instructions).IsRequired();
            builder.Property(r => r.TimeToPrepare).IsRequired();
            builder.Property(r => r.Picture);
            builder.Property(r => r.Shared).IsRequired();
        }
    }
}
