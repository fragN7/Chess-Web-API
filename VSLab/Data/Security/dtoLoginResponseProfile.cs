namespace VSLab.Data.Security;

public class dtoLoginResponseProfile
{
    public string Token { get; set; } = string.Empty;
    public tblUserProfile User { get; set; } = null!;
}