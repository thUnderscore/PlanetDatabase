using System;
using System.Data.Entity;
using System.Linq;
using PlanetDatabase.Data;

namespace PlanetDatabase.Service
{    
    public class PlanetService : IPlanetService
    {

#if UseDB
        static PlanetService()
        {
            Database.SetInitializer(new PlanetInitializer());
        }

#endif
        public Planet[] GetPlanets()
        {

#if UseDB
            using (PlanetContext context = new PlanetContext())
            {
                return context.Planets.ToArray();
            }
#else
            return PlanetInitializer.DefaultPlanetsArray;
#endif

        }
    }
}
