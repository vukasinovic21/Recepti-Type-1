using Back.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Back.Domain.ValueObjects;

namespace Back.Infrastructure.Data.Configurations
{
    public class PlanOfDietConfiguration : IEntityTypeConfiguration<PlanOfDiet>
    {
        public void Configure(EntityTypeBuilder<PlanOfDiet> builder)
        {
            builder.HasKey(pod => pod.Id);
            builder.Property(pod => pod.Id).HasConversion(
                planOfDietId => planOfDietId.Value,
                dbId => PlanOfDietId.Of(dbId));

            builder.HasOne<Recipe>()
                .WithMany()
                .HasForeignKey(pod => pod.RecipeId);
            
            builder.HasOne<TypeOfMeal>()
                .WithMany()
                .HasForeignKey(pod => pod.TypeOfMealId);
            
            builder.Property(pod => pod.DayOfWeek).IsRequired();
        }
    }
}
