using System.Web;
using System.Web.Mvc;
using WJ.PromoterSy.Web.UI.App_Start.Handler;

namespace WJ.PromoterSys.Web.UI
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandlerErrorAttribute());
            //filters.Add(new HandlerLoginAttribute());
            //filters.Add(new HandlerAuthorizeAttribute());
            //filters.Add(new HandlerAjaxOnlyAttribute());
            //filters.Add(new HandlerActionFilterAttribute());
        }
    }
}
