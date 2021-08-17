using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvestorZone.Entities
{
    public class Forum
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Post { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }

    }
}
