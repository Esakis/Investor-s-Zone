using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InvestorZone.Entities;
using Microsoft.EntityFrameworkCore;

namespace InvestorZone
{
    public class UserSeeder
    {
        private readonly UserDbContext _dbContext;
        public UserSeeder(UserDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Seed()
        {
            if (_dbContext.Database.CanConnect())
            {
                var pendingMigrations = _dbContext.Database.GetPendingMigrations();
                if (pendingMigrations != null && pendingMigrations.Any())
                {
                    _dbContext.Database.Migrate();
                }

                if (!_dbContext.Roles.Any())
                {
                    var roles = GetRoles();
                    _dbContext.Roles.AddRange(roles);
                    _dbContext.SaveChanges();
                }
                if (!_dbContext.Users.Any())
                {
                    var users = GetUsers();
                    _dbContext.Users.AddRange(users);
                    _dbContext.SaveChanges();
                }
            }
        }

        private IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>()
            {
                new Role()
                {
                    Name="User"
                },
                 new Role()
                {
                    Name="Admin"
                },
            };
            return roles;
        }

        private IEnumerable<User> GetUsers()
        {
            var users = new List<User>()
            {
                new User()
                {
                    Email="es11@wp.pl",
                    FirstName="Lukasz",
                    LastName= "S",
                    PasswordHash="Haslo1",
                    RoleId=1,
                },
               new User()
                {

                    Email="ddds11@wp.pl",
                    FirstName="Domi",
                    LastName= "B",
                    PasswordHash="Haslo2",
                    RoleId=1,
                },
               new User()
                {
                    Email="ggg11@wp.pl",
                    FirstName="Grzegorz",
                    LastName= "P",
                    PasswordHash="Haslo3",
                    RoleId=1,
                },
               new User()
                {
                    Email="aaa1@wp.pl",
                    FirstName="Artur",
                    LastName= "A",
                    PasswordHash="Haslo4",
                    RoleId=1,
                },
            };
            return users;
        
        }

    }
}
