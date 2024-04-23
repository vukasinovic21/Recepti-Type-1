using Back.Domain.Abstractions;
using Back.Domain.ValueObjects;

namespace Back.Domain.Models
{
    public class Question : Entity<QuestionId>
    {
        public string QuestionName { get; private set; } = default!;

        public static Question Create(QuestionId id, string questionname)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(questionname);

            var question = new Question
            {
                Id = id,
                QuestionName = questionname,
            };

            return question;
        }
    }
}
