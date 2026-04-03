using Microsoft.EntityFrameworkCore;

namespace InvestorZone.API.Entities;

public class UserDbContext : DbContext
{
    private readonly IConfiguration _configuration;

    public UserDbContext(DbContextOptions<UserDbContext> options, IConfiguration configuration) 
        : base(options)
    {
        _configuration = configuration;
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Forum> Forum { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection") 
                ?? "Server=DESKTOP-ANMM7DC\\SQLEXPRESS;Database=StrefaInwestora123;Trusted_Connection=True;TrustServerCertificate=True;";
            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
