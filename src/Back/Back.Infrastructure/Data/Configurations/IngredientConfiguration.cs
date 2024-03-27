using Back.Domain.Models;
using Back.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Back.Infrastructure.Data.Configurations
{
    public class IngredientConfiguration : IEntityTypeConfiguration<Ingredient>
    {
        public void Configure(EntityTypeBuilder<Ingredient> builder)
        {
            builder.HasKey(i => i.Id);
            builder.Property(i => i.Id).HasConversion(
                ingredientId => ingredientId.Value,
                dbId => IngredientId.Of(dbId));

            builder.Property(i => i.Name).HasMaxLength(256).IsRequired();
            builder.HasIndex(i => i.Name).IsUnique();
            builder.Property(i => i.Carbs).HasMaxLength(256);
            builder.Property(i => i.Sugar).HasMaxLength(256);
            builder.Property(i => i.Fat).HasMaxLength(256);
            builder.Property(i => i.Protein).HasMaxLength(256);
            builder.Property(i => i.kCal).HasMaxLength(256);
            builder.Property(i => i.GI).HasMaxLength(256);
        }
    }
}
