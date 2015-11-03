using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlanetDatabase.Data
{
    public class PlanetContext : DbContext
    {
        public PlanetContext() : base("PlanetContext")
    {
        }

        public DbSet<Planet> Planets { get; set; }
    }
}
