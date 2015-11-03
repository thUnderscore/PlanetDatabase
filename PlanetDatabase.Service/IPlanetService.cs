using System.ServiceModel;
using System.ServiceModel.Web;
using PlanetDatabase.Data;

namespace PlanetDatabase.Service
{
    [ServiceContract]
    interface IPlanetService
    {
        [OperationContract]
        [WebGet(UriTemplate = "/Planets")]        
        Planet[] GetPlanets();
    }
}
