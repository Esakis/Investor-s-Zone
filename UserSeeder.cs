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
                if (!_dbContext.Forum.Any())
                {
                    var forum = GetForum();
                    _dbContext.Forum.AddRange(forum);
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
                    GBP=100,

                },
               new User()
                {

                    Email="ddds11@wp.pl",
                    FirstName="Domi",
                    LastName= "B",
                    PasswordHash="Haslo2",
                    RoleId=1,
                    PLN=1000.3,
                    

                },
               new User()
                {
                    Email="tradecomp.pl@gmail.com",
                    FirstName="Grzegorz",
                    LastName= "P",
                    PasswordHash="AQAAAAEAACcQAAAAEKkbw9iBa3a4ns3T/g9YvkrxtnPX/4v9PytDouOF1jgYb2gK4VqkyZLedZ012JC0ig==",
                    RoleId=1,
                    PLN=1000.5,


                },
               new User()
                {
                    Email="aaa1@wp.pl",
                    FirstName="Artur",
                    LastName= "A",
                    PasswordHash="Haslo4",
                    RoleId=1,
                    EUR=500.8,
                    


                },
            };
            return users;    
        }

        private IEnumerable<Forum> GetForum()
        {
            var forum = new List<Forum>()
            {
                new Forum()
                {
                    UserId = 1,
                    Title = "Understanding Market Cycles",
                    Post = "Market cycles and trends are used to help investors predict the market. They are easy to see looking back, but much harder to pinpoint as they occur. Traders study technical analyses to try to understand how the market will move next. For the most part, professional investors follow the trend until it changes. They have a saying, The trend is your friend. What Causes a Market Cycle? The expansion and contraction of business, earnings, inflation, stability, and politics all affect market cycles. Basic human emotions and behaviors create market trends.17 People swing between fear and greed, between focusing on the good news and worrying about the negative. Markets react to the pendulum-like swing.",
                },
                new Forum()
                {
                    UserId = 2,
                    Title = "Trading the News and Economic Calendar",
                    Post = "Stocks, currencies, and commodities all respond to news, both predicted and unexpected. Because you understand that trends will eventually revert to the mean, or back to the trend, you may be able to take advantage of unexpected news. The knee-jerk response of bad news may cause a sudden drop in a security. Often its an overreaction and the security will bounce back. But not always. Knowing the fundamental value of the security will help you know if a news-related dip is a buying opportunity or not.",
                },
                new Forum()
                {
                    UserId = 3,
                    Title = "Set an investing budget",
                    Post = "Before you decide what to invest in, you need to decide how much you can afford to invest. Taking advantage of free money in the form of your company 401(k) match is always a good first move.But beyond that, try to build a six-month emergency fund that you keep in a bank account or CD. That helps you avoid losing money because you wont have to sell investments when theyre down if you encounter an unexpected expense. Once youre ready for an emergency, try to invest about 15% of your pre-tax income, though you may need to aim higher if youre getting a late start.",
                },
                new Forum()
                {
                    UserId = 4,
                    Title = "Invest regularly a little bit at a time",
                    Post = "One secret of successful investors: They invest no matter what the stock market is doing, using a practice called dollar-cost averaging. That means you commit to investing a certain amount at regular intervals. If you have a 401(k), you already do this through payroll deductions. Same goes if you automatically fund an individual retirement account. Sometimes youll invest when the market is up, and sometimes youll invest when its down. But you can reduce your overall investment costs because you lock in some of those low prices.",
                },
                new Forum()
                {
                    UserId = 1,
                    Title = "Accept some risk",
                    Post = "Whether you just dont care about the stock market or watching it sends you into a panic, investing in stocks is the only way to achieve the growth that will build a nest egg. Bonds are safer than stocks, but low risk comes with low returns, especially given todays rock-bottom interest rates. One good guideline is the Rule of 110: You subtract your age from 110 to get your ideal allocations of stocks to bonds. If youre 30, youd aim for 80% in stock investments and 20% in bond investments.",
                },


            };
            return forum;


        }

     }
}
