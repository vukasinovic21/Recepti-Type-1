using Back.Application.Dtos;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Back.Application.Auth.Commands.LoginUser
{
    public class LoginUserHandler(IApplicationDbContext dbContext, IConfiguration configuration)
        : ICommandHandler<LoginUserCommand, LoginUserResult>
    {

        public async Task<LoginUserResult> Handle(LoginUserCommand command, CancellationToken cancellationToken)
        {
            //login by email and password
            //return jwt if correct
            await Console.Out.WriteLineAsync(command.User.Email);
            var users = await dbContext.Users
                .Where(u => u.Email == command.User.Email)
                .ToListAsync(cancellationToken);


            var user = users.FirstOrDefault();
            if (user == null)
            {
                return new LoginUserResult("User not found");
            }

            if (BCrypt.Net.BCrypt.Verify(command.User.PasswordHash, user.PasswordHash))
            {
                return new LoginUserResult(CreateToken(user));
            }

            return new LoginUserResult("Bad password");
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Surname, user.LastName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.NameIdentifier, user.Id.Value.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
