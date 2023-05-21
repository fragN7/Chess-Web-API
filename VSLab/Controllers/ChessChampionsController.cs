using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VSLab.Data;

namespace VSLab.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChessChampionsController : ControllerBase
    {
        private readonly ChessDbContext _context;
        private readonly Validators _validator = new Validators();

        public ChessChampionsController(ChessDbContext context)
        {
            _context = context;
        }

        private static dtoChessChampion ChessChampionToDTO(tblChessChampion champion) =>
            new dtoChessChampion
            {
                ID = champion.ID,
                LastTrophy = champion.LastTrophy,
                Record = champion.Record,
                MaxRating = champion.MaxRating,
                ConsecutiveYears = champion.ConsecutiveYears,
                Current = champion.Current,
                Description = champion.Description,
                ChessPlayerID = champion.ChessPlayerID
            };

        private bool ChessChampionExists(int id)
        {
            return _context.tblChessChampions.Any(e => e.ID == id);
        }
        
        public class PagedResult<T>
        {
            public IEnumerable<T>? Data { get; set; }
            public int TotalPages { get; set; }
        }

        // GET: api/ChessChampions
        [HttpGet]
        public async Task<ActionResult<PagedResult<dtoChessChampion>>> GettblChessChampions([FromQuery] int page = 1, [FromQuery] int limit = 5)
        {
            var totalItems = await _context.tblChessChampions.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalItems / limit);

            var champs = await _context.tblChessChampions
                .Select(x => ChessChampionToDTO(x))
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            var result = new PagedResult<dtoChessChampion>
            {
                Data = champs,
                TotalPages = totalPages
            };

            return result;
        }

        // GET: api/ChessChampions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<tblChessChampion>> GettblChessChampionID(int id)
        {
            var champion = await _context.tblChessChampions
                .Include(x => x.ChessPlayer)
                .FirstOrDefaultAsync(x => x.ID == id);

            if(champion == null)
            {
                return NotFound();
            }

            return champion;
        }

        // PUT: api/ChessChampions/5
        // To protect from over posting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PuttblChessChampion(int id, dtoChessChampion dtoChessChampion)
        {
            if (id != dtoChessChampion.ID)
            {
                return BadRequest();
            }

            var champion = await _context.tblChessChampions.FindAsync(id);
            if (champion == null)
            {
                return BadRequest();
            }

            var player = await _context.tblChessPlayers.FindAsync(dtoChessChampion.ChessPlayerID);
            if (player == null)
            {
                return BadRequest();
            }

            champion.ConsecutiveYears = dtoChessChampion.ConsecutiveYears;
            champion.Record = dtoChessChampion.Record;
            champion.Current = dtoChessChampion.Current;
            champion.LastTrophy = dtoChessChampion.LastTrophy;
            champion.MaxRating = dtoChessChampion.MaxRating;
            champion.Description = dtoChessChampion.Description;
            champion.ChessPlayerID = dtoChessChampion.ChessPlayerID;
            champion.ChessPlayer = player;

            if (!_validator.ValidateChampion(champion))
            {
                return BadRequest();
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!ChessChampionExists(id))
            {
                return BadRequest();
            }

            return CreatedAtAction(nameof(GettblChessChampionID), new { id = champion.ID }, ChessChampionToDTO(champion));
        }

        // POST: api/ChessChampions
        // To protect from over posting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<dtoChessChampion>> PosttblChessChampion(dtoChessChampion dtoChessChampion)
        {
            var player = await _context.tblChessPlayers.FindAsync(dtoChessChampion.ChessPlayerID);
            if(player == null)
            {
                return BadRequest();
            }

            var newChamp = new tblChessChampion
            { 
                ConsecutiveYears = dtoChessChampion.ConsecutiveYears,
                Record = dtoChessChampion.Record,
                Current = dtoChessChampion.Current,
                LastTrophy = dtoChessChampion.LastTrophy,
                MaxRating = dtoChessChampion.MaxRating,
                Description = dtoChessChampion.Description,
                ChessPlayerID = dtoChessChampion.ChessPlayerID,
                ChessPlayer = player
            };

            if (!_validator.ValidateChampion(newChamp))
            {
                return BadRequest();
            }

            _context.tblChessChampions.Add(newChamp);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GettblChessChampionID), new { id = newChamp.ID }, ChessChampionToDTO(newChamp));
        }

        // DELETE: api/ChessChampions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletetblChessChampion(int id)
        {
            var champion = await _context.tblChessChampions.FindAsync(id);
            if(champion == null)
            {
                return NotFound();
            }

            _context.tblChessChampions.Remove(champion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //FILTER
        [HttpGet("filter/{rating}")]
        public async Task<IEnumerable<tblChessChampion>> GettblChessChampionByRating(int rating)
        {
            var champs = await _context.tblChessChampions.Where(a => a.MaxRating > rating).ToListAsync();
            return champs;
        }

        [HttpPost("{id}/champions")]
        public async Task<IActionResult> PosttblChessChampions(int id, List<int> ChessChampionIds)
        {
            var player = await _context.tblChessPlayers.FindAsync(id);

            if (player == null)
            {
                return BadRequest();
            }

            foreach (var champId in ChessChampionIds)
            {
                var champ = await _context.tblChessChampions.FindAsync(champId);

                if (champ == null)
                {
                    return BadRequest();
                }

                var dtoChamp = new dtoChessChampion
                {
                    ID = champId,
                    Record = champ.Record,
                    MaxRating = champ.MaxRating,
                    ConsecutiveYears = champ.ConsecutiveYears,
                    Current = champ.Current,
                    Description = champ.Description,
                    LastTrophy = champ.LastTrophy,
                    ChessPlayerID = id
                };

                await PuttblChessChampion(champId, dtoChamp);
            }

            return NoContent();
        }

        [HttpPost("{id}/champions/list")]
        public async Task<IActionResult> PosttblChessChampionsList(int id, List<dtoChessChampion> chessChampions)
        {
            var player = await _context.tblChessPlayers.FindAsync(id);

            if (player == null)
            {
                return BadRequest();
            }

            foreach (var champ in chessChampions)
            {
                var dtoChamp = new dtoChessChampion
                {
                    ID = champ.ID,
                    Record = champ.Record,
                    MaxRating = champ.MaxRating,
                    ConsecutiveYears = champ.ConsecutiveYears,
                    Current = champ.Current,
                    Description = champ.Description,
                    LastTrophy = champ.LastTrophy,
                    ChessPlayerID = id
                };

                await PosttblChessChampion(dtoChamp);
            }

            return NoContent();
        }
    }
}
