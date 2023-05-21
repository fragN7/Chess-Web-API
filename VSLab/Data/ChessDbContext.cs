using Microsoft.EntityFrameworkCore;
using VSLab.Data.Security;

namespace VSLab.Data
{
    public class ChessDbContext : DbContext
    {
        public ChessDbContext(DbContextOptions opt) : base(opt)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tblChessPlayer>()
                .HasOne<tblUserProfile>(s => s.TblUser)
                .WithMany(g => g.ChessPlayers)
                .HasForeignKey(s => s.UserID);
            
            modelBuilder.Entity<tblChessTournament>()
                .HasOne<tblUserProfile>(s => s.TblUser)
                .WithMany(g => g.ChessTournaments)
                .HasForeignKey(s => s.UserID);
            
            modelBuilder.Entity<tblChessChampion>()
                .HasOne<tblChessPlayer>(s => s.ChessPlayer)
                .WithMany(g => g.ChessChampions)
                .HasForeignKey(s => s.ChessPlayerID);

            modelBuilder.Entity<tblChessParticipation>()
                .HasKey(c => new { c.ChessTournamentID, c.ChessPlayerID});
            
            modelBuilder.Entity<tblChessParticipation>()
                .HasOne<tblChessTournament>(s => s.ChessTournament)
                .WithMany(g => g.TournamentParticipations)
                .HasForeignKey(s => s.ChessTournamentID);

            modelBuilder.Entity<tblChessParticipation>()
                .HasOne<tblChessPlayer>(s => s.ChessPlayer)
                .WithMany(g => g.PlayerParticipations)
                .HasForeignKey(s => s.ChessPlayerID);
        }
        
        public virtual DbSet<tblChessParticipation> tblChessParticipations { get; set; } = default!;
        public virtual DbSet<tblChessTournament> tblChessTournaments { get; set; } = default!;
        public virtual DbSet<tblChessPlayer> tblChessPlayers { get; set; } = default!;
        public virtual DbSet<tblChessChampion> tblChessChampions { get; set; } = default!;
        public virtual DbSet<tblUserProfile> tblUserProfiles { get; set; } = default!;
    }
}
