using Back.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Back.Domain.ValueObjects;

namespace Back.Infrastructure.Data.Configurations
{
    public class TypeOfFoodConfiguration : IEntityTypeConfiguration<TypeOfFood>
    {
        public void Configure(EntityTypeBuilder<TypeOfFood> builder)
        {
            builder.HasKey(tof => tof.Id);
            builder.Property(tof => tof.Id).HasConversion(
                typeOfFoodId => typeOfFoodId.Value,
                dbId => TypeOfFoodId.Of(dbId));

            builder.Property(tof => tof.TypeName).HasMaxLength(256).IsRequired();
            builder.HasIndex(tof => tof.TypeName).IsUnique();
        }
    }
}
