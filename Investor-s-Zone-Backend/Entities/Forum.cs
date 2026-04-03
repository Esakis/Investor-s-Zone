using System.ComponentModel.DataAnnotations;

namespace InvestorZone.API.Entities;

public class Forum
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(200)]
    public string Title { get; set; }
    
    [Required]
    [StringLength(2000)]
    public string Post { get; set; }
    
    public int? UserId { get; set; }
    public virtual User User { get; set; }
}
