namespace VSLab.Data
{
    public class dtoChessTournament
    {
        public int ID { get; set; }
        public string Name { get; init; } = string.Empty;
        public int NumParticipants { get; init; }
        public string Host { get; init; } = string.Empty;
        public int PrizeMoney { get; init; }
        public string Trophy { get; init; } = string.Empty;
        public string Description { get; init; } = string.Empty;
        public int UserID { get; init; }

    }
}
