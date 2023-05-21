using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using VSLab.Data;
using VSLab.Data.Security;


namespace VSLab.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserProfilesController : ControllerBase
    {
        private readonly ChessDbContext _context;
        private readonly IConfiguration _config;

        public UserProfilesController(ChessDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] dtoUserProfile model)
        {
            if (_context.tblUserProfiles.Any(x => x.UserName == model.UserName))
            {
                return BadRequest("Username already exists");
            }
            
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);
            var confirmationCode = Guid.NewGuid().ToString().Substring(0, 8);

            var user = new tblUserProfile
            {
                Password = hashedPassword,
                UserName = model.UserName,
                Bio = model.Bio,
                BirthDate = model.BirthDate,
                PhoneNumber = model.PhoneNumber,
                ConfirmationCode = confirmationCode,
                IsActive = false
            };

            _context.tblUserProfiles.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User created successfully", confirmationCode });
        }
        
        [AllowAnonymous]
        [HttpPost("register/confirm/{confirmation}")]
        public async Task<IActionResult> RegisterConfirm(string confirmation)
        {
            var user = await _context.tblUserProfiles.FirstOrDefaultAsync(x => x.ConfirmationCode == confirmation);

            if (user == null)
            {
                return BadRequest("Invalid confirmation code");
            }
            
            user.IsActive = true;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Registration confirmed" });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public Task<IActionResult> Login([FromBody] dtoLoginProfile model)
        {
            var user = _context.tblUserProfiles.FirstOrDefault(u => u.UserName == model.UserName);

            if (user!.IsActive == false)
            {
                return Task.FromResult<IActionResult>(Unauthorized("User not active"));
            }

            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
            {
                return Task.FromResult<IActionResult>(Unauthorized("Invalid password"));
            }

            var tokenString = GenerateJwtToken(user);

            return Task.FromResult<IActionResult>(Ok(new { token = tokenString, user }));
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<tblChessPlayer>> GetUserID(int id)
        {
            var user = await _context.tblUserProfiles
                .Include(x => x.ChessPlayers)
                .Include(x => x.ChessTournaments)
                .FirstOrDefaultAsync(x => x.ID == id);

            if (user == null) 
            {
                return NotFound();
            }

            return Ok(user);
        }
        
        [HttpGet("username/{username}")]
        public async Task<ActionResult<tblChessPlayer>> GetUsername(string username)
        {
            var user = await _context.tblUserProfiles
                .FirstOrDefaultAsync(x => x.UserName == username);

            if (user == null) 
            {
                return NotFound();
            }

            return Ok(user);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserProfile(int id, [FromBody] dtoUserProfile userProfileDto)
        {
            var userProfile = await _context.tblUserProfiles.FindAsync(id);

            if (userProfile == null) 
            {
                return NotFound();
            }

            userProfile.UserName = userProfileDto.UserName;
            _context.tblUserProfiles.Update(userProfile);
            await _context.SaveChangesAsync();

            return Ok(userProfile);
        }


        private string GenerateJwtToken(tblUserProfile user)
        {

            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, "Admin"),
                new Claim(ClaimTypes.Role, "User"),
                new Claim(ClaimTypes.Role, "Moderator")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetValue<string>("Jwt:Token")!));
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
