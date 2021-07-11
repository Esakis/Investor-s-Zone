using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InvestorZone.Entities;

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
                if (!_dbContext.Users.Any())
                {
                    var users = GetUsers();
                    _dbContext.Users.AddRange(users);
                    _dbContext.SaveChanges();
                }
            }
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
                },
               new User()
                {

                    Email="ddds11@wp.pl",
                    FirstName="Domi",
                    LastName= "B",
                },
               new User()
                {
                    Email="ggg11@wp.pl",
                    FirstName="Grzegorz",
                    LastName= "P",
                },
               new User()
                {
                    Email="aaa1@wp.pl",
                    FirstName="Artur",
                    LastName= "A",
                },
            };
            return users;
        
        }

    }
}
