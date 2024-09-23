using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Back.Application.Auth.Queries.LoginUser
{
    public class LoginUserHandler(IApplicationDbContext dbContext, IConfiguration configuration)
        : IQueryHandler<LoginUserQuery, LoginUserResult>
    {

        public async Task<LoginUserResult> Handle(LoginUserQuery query, CancellationToken cancellationToken)
        {
            //login by name and password
            //return jwt if correct

            var users = await dbContext.Users
                .Where(u => u.Email == query.loginDto.Email)
                .ToListAsync(cancellationToken);

            var user = users[0];

            if(BCrypt.Net.BCrypt.Verify(query.loginDto.Passwordhash, user.PasswordHash))
            {
                return new LoginUserResult(CreateToken(user));
            }

            return new LoginUserResult("Error");
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Surname, user.LastName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                configuration.GetSection("AppSettings:Token").Value!));
            Console.WriteLine(configuration.GetSection("AppSettings:Token").Value);
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
