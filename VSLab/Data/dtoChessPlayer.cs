namespace VSLab.Data
{
    public class dtoChessPlayer
    {
        public int ID { get; init; }
        public string Name { get; init; } = string.Empty;
        public string Country { get; init; } = string.Empty;
        public int Rating { get; init; }
        public int IsMaster { get; init; }
        public int StartYear { get; init; }
        public string Description { get; init; } = string.Empty;
        public int UserID { get; init; }

    }
}
