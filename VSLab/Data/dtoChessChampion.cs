namespace VSLab.Data
{
    public class dtoChessChampion
    {
        public int ID { get; init; }
        public string LastTrophy { get; init; } = string.Empty;
        public string Record { get; init; } = string.Empty;
        public int MaxRating { get; init; }
        public int ConsecutiveYears { get; init; }
        public int Current { get; init; }
        public string Description { get; init; } = string.Empty;
        public int ChessPlayerID { get; init; }
    }
}
