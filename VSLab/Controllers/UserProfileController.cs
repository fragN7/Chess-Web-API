using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IConfiguration config;

        public UserProfilesController(ChessDbContext context, IConfiguration config)
        {
            _context = context;
            this.config = config;
        }

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

        [HttpPost("login")]
        public ActionResult<dtoLoginResponseProfile> Login([FromBody] dtoLoginProfile model)
        {
            var user = _context.tblUserProfiles.FirstOrDefault(u => u.UserName == model.UserName);

            if (user!.IsActive == false)
            {
                throw new Exception("User not active");
            }

            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
            {
                throw new Exception("Incorrect password");
            }

            var tokenString = GenerateJwtToken(user);

            var result = new dtoLoginResponseProfile
            {
                Token = tokenString,
                User = user
            };

            return Ok(result);
        }
        
        [HttpGet("{id}")]
        [Authorize]
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
        
        [Authorize(Roles = "Normal")]
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
        
        [Authorize(Roles = "Admin")]
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

            var claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, user.ID.ToString())
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(this.config.GetSection("AppSettings:Key").Value!
                ));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
