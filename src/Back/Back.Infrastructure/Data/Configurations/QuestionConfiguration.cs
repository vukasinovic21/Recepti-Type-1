using Back.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Back.Domain.ValueObjects;

namespace Back.Infrastructure.Data.Configurations
{
    public class QuestionConfiguration : IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            builder.HasKey(q => q.Id);
            builder.Property(q => q.Id).HasConversion(
                questionId => questionId.Value,
                dbId => QuestionId.Of(dbId));

            builder.Property(q => q.QuestionName).HasMaxLength(256).IsRequired();
            builder.HasIndex(q => q.QuestionName).IsUnique();
        }
    }
}
