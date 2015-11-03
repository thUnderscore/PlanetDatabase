using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace PlanetDatabase.Data
{
    [DataContract]
    public class Planet
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "distanceToSunKm")]
        public float DistanceToSunKm { get; set; }
        
    }
}
