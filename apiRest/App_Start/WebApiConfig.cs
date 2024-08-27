using System.Web.Http;
using System.Web.Http.Cors;

public static class WebApiConfig
{
    public static void Register(HttpConfiguration config)
    {
        // Habilitar CORS globalmente
        var cors = new EnableCorsAttribute("*", "*", "*");
        config.EnableCors(cors);

        // Configuración y servicios de API web
        // Configuración de rutas de API web
        config.MapHttpAttributeRoutes();

        config.Routes.MapHttpRoute(
            name: "DefaultApi",
            routeTemplate: "api/{controller}/{id}",
            defaults: new { id = RouteParameter.Optional }
        );
    }
}
