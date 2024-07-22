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
        //public string QuestionId { get; private set; } = default!; //Ipak bi valjalo da se ubaci jer je logicnije tako. 
        public string ForgotPasswordAnswerHash { get; private set; } = default!;
        public DateOnly DateOfBirth { get; private set; } = default!;
        public string Role { get; private set; } = default!;

        public static User Create(UserId id, string name, string lastname, string username, string email, string passwordhash, string forgotpasswordanswerhash, DateOnly dateofbirth)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(name);
            ArgumentException.ThrowIfNullOrWhiteSpace(lastname);
            ArgumentException.ThrowIfNullOrWhiteSpace(username);
            ArgumentException.ThrowIfNullOrWhiteSpace(email);
            ArgumentException.ThrowIfNullOrWhiteSpace(passwordhash);
            ArgumentException.ThrowIfNullOrWhiteSpace(forgotpasswordanswerhash);

            var user = new User
            {
                Id = UserId.Of(Guid.NewGuid()),
                Name = name,
                LastName = lastname,
                Username = username,
                Email = email,
                PasswordHash = passwordhash,
                ForgotPasswordAnswerHash = forgotpasswordanswerhash,
                DateOfBirth = dateofbirth,
                Role = "USER"
            };

            if (id == UserId.Of(new Guid("58c49479-ec65-4de2-86e7-033c546291aa")))
                user.Role = "ADMIN";

            return user;
        }
    }
}
