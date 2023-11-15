namespace VSLab.Data.Security;

public class tblUserProfile
{
    [System.ComponentModel.DataAnnotations.Key]
    public int ID { get; set; }
    public string Password { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string Roles { get; set; } = "Normal";
    public string BirthDate { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string ConfirmationCode { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public ICollection<tblChessPlayer> ChessPlayers { get; set; } = null!;
    public ICollection<tblChessTournament> ChessTournaments { get; set; } = null!;
}

