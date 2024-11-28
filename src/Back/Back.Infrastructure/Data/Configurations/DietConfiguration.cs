using Back.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Back.Domain.ValueObjects;

namespace Back.Infrastructure.Data.Configurations
{
    public class DietConfiguration : IEntityTypeConfiguration<Diet>
    {
        public void Configure(EntityTypeBuilder<Diet> builder)
        {
            builder.HasKey(d => d.Id);
            builder.Property(d => d.Id).HasConversion(
                dietId => dietId.Value,
                dbId => DietId.Of(dbId));

            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey(d => d.UserId)
                .IsRequired();

            builder.HasMany(d => d.PlanOfDiets)
                .WithOne()
                .HasForeignKey(pod => pod.DietId);

            builder.Property(d => d.DietName).HasMaxLength(256).IsRequired();
            builder.HasIndex(d => d.DietName).IsUnique();
            //builder.Property(d => d.NutritionId).HasConversion;

            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey(d => d.NutritionId)
                .IsRequired();
        }
    }
}
