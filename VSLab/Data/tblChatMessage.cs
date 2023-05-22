namespace VSLab.Data;

public class tblChatMessage
{
    [System.ComponentModel.DataAnnotations.Key]
    public int ID { get; set; }
    public string message { get; set; } = string.Empty;
    public string username { get; set; } = string.Empty;
}