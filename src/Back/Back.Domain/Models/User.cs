using Back.Domain.Abstractions;
using Back.Domain.ValueObjects;

namespace Back.Domain.Models
{
    public class User : Entity<UserId>
    {
        public string Name { get; private set; } = default!;
        public string LastName { get; private set; } = default!;
        public string Username { get; private set; } = default!;
        public string Email { get; private set; } = default!;
        public string PasswordHash { get; private set; } = default!;
        public QuestionId QuestionId { get; private set; } = default!; 
        public string ForgotPasswordAnswerHash { get; private set; } = default!;
        public DateOnly DateOfBirth { get; private set; } = default!;
        public string Role { get; private set; } = default!;

        public string Sex {  get; private set; } = default!;

        public static User Create(UserId id, string name, string lastname, string username, string email, string passwordhash, QuestionId questionId, string forgotpasswordanswerhash, DateOnly dateofbirth, string Sex)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(name);
            ArgumentException.ThrowIfNullOrWhiteSpace(lastname);
            ArgumentException.ThrowIfNullOrWhiteSpace(username);
            ArgumentException.ThrowIfNullOrWhiteSpace(email);
            ArgumentException.ThrowIfNullOrWhiteSpace(passwordhash);
            ArgumentException.ThrowIfNullOrWhiteSpace(forgotpasswordanswerhash);
            ArgumentException.ThrowIfNullOrWhiteSpace(Sex);

            var user = new User
            {
                Id = UserId.Of(Guid.NewGuid()),
                Name = name,
                LastName = lastname,
                Username = username,
                Email = email,
                PasswordHash = passwordhash,
                QuestionId = questionId,
                ForgotPasswordAnswerHash = forgotpasswordanswerhash,
                DateOfBirth = dateofbirth,
                Role = "USER",
                Sex = Sex
            };

            if (id == UserId.Of(new Guid("58c49479-ec65-4de2-86e7-033c546291aa")))
                user.Role = "ADMIN";

            return user;
        }
    }
}
