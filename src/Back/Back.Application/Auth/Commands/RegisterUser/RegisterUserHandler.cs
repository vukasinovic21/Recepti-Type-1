﻿using Back.Application.Dtos;
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

            var user = RegisterUser(command.User);

            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync(cancellationToken);

            return new RegisterUserResult(user.Id.Value);
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