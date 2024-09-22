using Back.Application.Dtos;

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

            var user = RegisterUser(command.User);

            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync(cancellationToken);

            return new RegisterUserResult(user.Id.Value);
        }

        private User RegisterUser(RegisterUserDto userDto)
        {
            var newUser = User.Create(
                id: UserId.Of(Guid.NewGuid()),
                name: userDto.Name,
                lastname: userDto.LastName,
                username: userDto.Username,
                email: userDto.Email,
                passwordhash: userDto.Passwordhash,
                questionId: QuestionId.Of(userDto.QuestionId),
                forgotpasswordanswerhash: userDto.ForgotPasswordAnswerHash,
                dateofbirth: userDto.DateOfBirth,
                Sex: userDto.Sex
                );

            return newUser;
        }
    }
}