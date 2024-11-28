using Back.Application.Dtos;
using BCrypt.Net;

namespace Back.Application.Auth.Commands.RegisterUser
{

    public class RegisterUserHandler(IApplicationDbContext dbContext)
       : ICommandHandler<RegisterUserCommand, RegisterUserResult>
    {
        public async Task<RegisterUserResult> Handle(RegisterUserCommand command, CancellationToken cancellationToken)
        {
            //Register user entity from command object
            //save to database
            //return result
            var existingUser = await dbContext.Users
                .FirstOrDefaultAsync(u => u.Email == command.User.Email, cancellationToken);

            var existingUser1 = await dbContext.Users
                .FirstOrDefaultAsync(u => u.Username == command.User.Username, cancellationToken);

            if (existingUser != null)
            {
                throw new InvalidOperationException("An user with this email already exists.");
            }

            else if (existingUser1 != null)
            {
                throw new InvalidOperationException("An user with this username already exists.");
            }

            else
            {
                var user = RegisterUser(command.User);

                dbContext.Users.Add(user);
                await dbContext.SaveChangesAsync(cancellationToken);

                return new RegisterUserResult(user.Id.Value);
            }    
        }

        private User RegisterUser(RegisterUserDto userDto)
        {
            string passHash = BCrypt.Net.BCrypt.HashPassword(userDto.Passwordhash);
            string answerHash = BCrypt.Net.BCrypt.HashPassword(userDto.ForgotPasswordAnswerHash);
            var newUser = User.Create(
                id: UserId.Of(Guid.NewGuid()),
                name: userDto.Name,
                lastname: userDto.LastName,
                username: userDto.Username,
                email: userDto.Email,
                passwordhash: passHash,
                questionId: QuestionId.Of(userDto.QuestionId),
                forgotpasswordanswerhash: answerHash,
                dateofbirth: userDto.DateOfBirth,
                Sex: userDto.Sex
                );

            return newUser;
        }
    }
}