using Back.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Back.Domain.ValueObjects;

namespace Back.Infrastructure.Data.Configurations
{
    public class TypeOfMealConfiguration : IEntityTypeConfiguration<TypeOfMeal>
    {
        public void Configure(EntityTypeBuilder<TypeOfMeal> builder)
        {
            builder.HasKey(tom => tom.Id);
            builder.Property(tom => tom.Id).HasConversion(
                typeOfMealId => typeOfMealId.Value,
                dbId => TypeOfMealId.Of(dbId));

            builder.Property(tom => tom.TypeName).HasMaxLength(256).IsRequired();
            builder.HasIndex(tom => tom.TypeName).IsUnique();
        }
    }
}
