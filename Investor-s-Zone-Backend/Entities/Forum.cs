namespace InvestorZone.API.Entities;

public class Forum
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Post { get; set; }
    public int UserId { get; set; }
    public virtual User User { get; set; }
}
