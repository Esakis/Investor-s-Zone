using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvestorZone.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Nationality { get; set; }
        public string PasswordHash { get; set; }

        public int RoleId { get; set; }
        public virtual Role Role { get; set; }
        public double PLN { get; set; }
        public double EUR { get; set; }
        public double USD { get; set; }
        public double CHF { get; set; }
        public double GBP { get; set; }
        public double AUD { get; set; }
        public double BGN { get; set; }
        public double CAD { get; set; }
        public double CZK { get; set; }
        public double DKK { get; set; }
        public double HDK { get; set; }
        public double HRK { get; set; }
        public double MXN { get; set; }
        public double NOK { get; set; }
        public double NZD { get; set; }
        public double RON { get; set; }
        public double RUB { get; set; }
        public double SEK { get; set; }
        public double SGD { get; set; }
        public double TRY { get; set; }
        public double ZAR { get; set; }


    }
}
