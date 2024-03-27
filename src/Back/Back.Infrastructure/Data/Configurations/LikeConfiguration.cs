using Back.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Back.Domain.ValueObjects;

namespace Back.Infrastructure.Data.Configurations
{
    public class LikeConfiguration : IEntityTypeConfiguration<Like>
    {
        public void Configure(EntityTypeBuilder<Like> builder)
        {
            builder.HasKey(l => l.Id);
            builder.Property(l => l.Id).HasConversion(
                likeId => likeId.Value,
                dbId => LikeId.Of(dbId));

            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey(l => l.UserId)
                .IsRequired();

            builder.HasOne<Recipe>()
                .WithMany()
                .HasForeignKey(l => l.RecipeId)
                .IsRequired();

        }
    }
}
