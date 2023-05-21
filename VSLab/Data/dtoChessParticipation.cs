namespace VSLab.Data
{
    public class dtoChessParticipation
    {
        public int ChessPlayerID { get; init; }
        public int ChessTournamentID { get; init; }
        public string DateSigned { get; init; } = string.Empty;
        public string DurationPlayed { get; init; } = string.Empty;
        public string Description { get; set; } = string.Empty;

    }
}
