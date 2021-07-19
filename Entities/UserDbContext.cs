using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace InvestorZone.Entities
{
    public class UserDbContext:DbContext
    {
        private string _connectionString =
            "Server=DESKTOP-NT8V889\\SERVER;Database=StrefaInwestowaningu;Trusted_Connection =True;";


        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<User>()
            //    .Property(u => u.Email)
            //   // .IsRequired()
            //    .HasMaxLength(25);

            //modelBuilder.Entity<User>()
            //    .Property(u => u.FirstName)
            //  //  .IsRequired()
            //    .HasMaxLength(25);

            //modelBuilder.Entity<User>()
            //    .Property(u => u.LastName)
            // //   .IsRequired()
            //    .HasMaxLength(25);

            //modelBuilder.Entity<Role>()
            //    .Property(u => u.Name)
            ////    .IsRequired()
            //    .HasMaxLength(25);

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
