namespace VSLab.Data.Security;

public class dtoUserProfile
{
    public int ID { get; set; }
    public string Password { get; init; } = string.Empty;
    public string UserName { get; init; } = string.Empty;
    public string Bio { get; init; } = string.Empty;
    public string BirthDate { get; init; } = string.Empty;
    public string PhoneNumber { get; init; } = string.Empty;
}