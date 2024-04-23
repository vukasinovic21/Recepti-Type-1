using Back.Domain.Models;
using Back.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Back.Infrastructure.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id).HasConversion(
                userId => userId.Value,
                dbId => UserId.Of(dbId));
            builder.Property(u => u.Name).HasMaxLength(256).IsRequired();
            builder.Property(u => u.LastName).HasMaxLength(256).IsRequired();
            builder.Property(u => u.Username).HasMaxLength(256).IsRequired();
            builder.HasIndex(u => u.Username).IsUnique();
            builder.Property(u => u.Email).HasMaxLength(256).IsRequired();
            builder.HasIndex(u => u.Email).IsUnique();
            builder.Property(u => u.PasswordHash).HasMaxLength(256).IsRequired();
            builder.Property(u => u.ForgotPasswordAnswerHash).HasMaxLength(256).IsRequired();
            builder.Property(u => u.DateOfBirth).IsRequired();
            builder.Property(u => u.Role)
                .HasDefaultValue("USER");

        }
    }
}
