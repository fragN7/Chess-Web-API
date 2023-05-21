using System.ComponentModel.DataAnnotations;
using VSLab.Data.Security;

namespace VSLab.Data
{
    public class tblChessPlayer
    {
        [Key]
        public int ID { get; init; }
        public string Name { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public int Rating { get; set; }
        public int IsMaster { get; set; }
        public int StartYear { get; set; }
        public string Description { get; set; } = string.Empty;
        public ICollection<tblChessChampion> ChessChampions { get; set; } = null!;
        public ICollection<tblChessParticipation> PlayerParticipations { get; set; } = null!;
        public int UserID { get; set; }
        public tblUserProfile TblUser { get; set; } = null!;

    }
}
