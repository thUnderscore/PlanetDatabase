using System;
using System.Data.Entity;
using System.Linq;
using PlanetDatabase.Data;

namespace PlanetDatabase.Service
{    
    public class PlanetService : IPlanetService
    {

        static PlanetService()
        {
            Database.SetInitializer(new PlanetInitializer());
        }

        public Planet[] GetPlanets()
        {
            using (PlanetContext context = new PlanetContext())
            {
                return context.Planets.ToArray();
            }
        }
    }
}
