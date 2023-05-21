using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VSLab.Data;

namespace VSLab.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChessTournamentsController : ControllerBase
    {
        private readonly ChessDbContext _context;
        private readonly Validators _validator = new Validators();
        public ChessTournamentsController(ChessDbContext context)
        {
            _context = context;
        }

        private static dtoChessTournament ChessTournamentToDTO(tblChessTournament tournament) =>
            new dtoChessTournament
            {
                ID = tournament.ID,
                Name = tournament.Name,
                NumParticipants = tournament.NumParticipants,
                Host = tournament.Host,
                PrizeMoney = tournament.PrizeMoney,
                Trophy = tournament.Trophy,
                Description = tournament.Description,
                UserID = tournament.UserID
            };

        private bool ChessTournamentExists(long id)
        {
            return (_context.tblChessTournaments.Any(e => e.ID == id));
        }
        public class PagedResult<T>
        {
            public IEnumerable<T>? Data { get; set; }
            public int TotalPages { get; set; }
        }

        // GET: api/ChessTournaments
        [HttpGet]
        public async Task<ActionResult<PagedResult<dtoChessTournament>>> GettblChessTournaments([FromQuery] int page = 1, [FromQuery] int limit = 5)
        {
            var totalItems = await _context.tblChessTournaments.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalItems / limit);

            var tournaments = await _context.tblChessTournaments
               .Select(x => ChessTournamentToDTO(x))
               .Skip((page - 1) * limit)
               .Take(limit)
               .ToListAsync();

            var result = new PagedResult<dtoChessTournament>
            {
                Data = tournaments,
                TotalPages = totalPages
            };

            return result;
        }

        // GET: api/ChessTournament/5
        [HttpGet("{id}")]
        public async Task<ActionResult<tblChessTournament>> GettblChessTournamentsID(int id)
        {
            var tournament = await _context.tblChessTournaments
                .Include(x => x.TournamentParticipations)
                .Include(x => x.TblUser)
                .FirstOrDefaultAsync(x => x.ID == id);

            if(tournament == null)
            {
                return NotFound();
            }

            return tournament;
        }

        // PUT: api/ChessTournament/5
        // To protect from over posting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PuttblChessTournament(int id, dtoChessTournament dtoChessTournament)
        {
            var tournament = await _context.tblChessTournaments.FindAsync(id);
            if(tournament == null)
            {
                return NotFound();
            }

            var user = await _context.tblUserProfiles.FindAsync(dtoChessTournament.UserID);
            if(user == null)
            {
                return NotFound();
            }

            tournament.Host = dtoChessTournament.Host;
            tournament.NumParticipants = dtoChessTournament.NumParticipants;
            tournament.Name = dtoChessTournament.Name;
            tournament.PrizeMoney = dtoChessTournament.PrizeMoney;
            tournament.Trophy = dtoChessTournament.Trophy;
            tournament.Description = dtoChessTournament.Description;
            tournament.UserID = dtoChessTournament.UserID;
            tournament.TblUser = user;

            if(!_validator.ValidateTournament(tournament))
            {
                return BadRequest();
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException) when (!ChessTournamentExists(id))
            {
                return NotFound();
            }

            return CreatedAtAction(nameof(GettblChessTournamentsID), new { id = tournament.ID }, ChessTournamentToDTO(tournament));
        }

        // POST: api/ChessTournament
        // To protect from over posting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<dtoChessTournament>> PosttblChessTournament(dtoChessTournament dtoChessTournament)
        {
            var user = await _context.tblUserProfiles.FindAsync(dtoChessTournament.UserID);
            if(user == null)
            {
                return NotFound();
            }
            
            var tournament = new tblChessTournament
            {
                Name = dtoChessTournament.Name,
                Trophy = dtoChessTournament.Trophy,
                Host = dtoChessTournament.Host,
                PrizeMoney = dtoChessTournament.PrizeMoney,
                NumParticipants = dtoChessTournament.NumParticipants,
                Description = dtoChessTournament.Description,
                UserID = dtoChessTournament.UserID,
                TblUser = user
            };

            if (!_validator.ValidateTournament(tournament))
            {
                return BadRequest();
            }

            _context.tblChessTournaments.Add(tournament);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GettblChessTournamentsID), new { id = tournament.ID }, ChessTournamentToDTO(tournament));
        }

        // DELETE: api/ChessTournament/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletetblChessTournament(int id)
        {
            var tournament = await _context.tblChessTournaments.FindAsync(id);
            if(tournament == null)
            {
                return NotFound();
            }

            _context.tblChessTournaments.Remove(tournament);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
