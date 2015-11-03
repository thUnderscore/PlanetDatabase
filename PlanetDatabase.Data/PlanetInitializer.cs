using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlanetDatabase.Data
{
    public class PlanetInitializer : DropCreateDatabaseAlways<PlanetContext>
    {
        protected override void Seed(PlanetContext context)
        {
            context.Planets.AddRange(new[]{
                new Planet { Id = 0, Name = "Mercury", DistanceToSunKm = 46000000},
                new Planet { Id = 1, Name = "Venus", DistanceToSunKm = 107500000},
                new Planet { Id = 2, Name = "Earth", DistanceToSunKm = 147100000},
                new Planet { Id = 3, Name = "Mars", DistanceToSunKm = 206700000},
                new Planet { Id = 4, Name = "Jupiter", DistanceToSunKm = 740900000},
                new Planet { Id = 5, Name = "Saturn", DistanceToSunKm = 1348000000},
                new Planet { Id = 6, Name = "Uranus", DistanceToSunKm = 2739000000},
                new Planet { Id = 7, Name = "Neptune", DistanceToSunKm = 4456000000}
            });
        }
    }
}
