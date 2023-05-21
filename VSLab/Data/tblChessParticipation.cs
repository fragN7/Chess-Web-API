using VSLab.Data.Security;

namespace VSLab.Data
{
    public class tblChessParticipation
    {
        public string DateSigned { get; set; } = string.Empty;
        public string DurationPlayed { get; set; } = string.Empty;
        public int ChessPlayerID { get; set; }
        public int ChessTournamentID { get; set; }
        public string Description { get; set; } = string.Empty;
        public tblChessPlayer ChessPlayer { get; set; } = null!;
        public tblChessTournament ChessTournament { get; set; } = null!;
    }
}
