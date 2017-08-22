
using System.Web.Mvc;
using WJ.PromoterSys.Web.Core.Json;
using WJ.PromoterSys.Web.Core.Log;
using WJ.PromoterSys.Web.Model.Result;

namespace WJ.PromoterSys.Web.UI
{
    public class HandlerErrorAttribute : HandleErrorAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            base.OnException(context);
            context.ExceptionHandled = true;
            context.HttpContext.Response.StatusCode = 200;
            WriteLog(context);
            context.Result = new ContentResult { Content = new AjaxResult { state = ResultType.error.ToString(), message = context.Exception.Message }.ToJson() };
        }

        private void WriteLog(ExceptionContext context)
        {
            if (context == null)
                return;
            var log = LogFactory.GetLogger(context.Controller.ToString());
            log.Error(context.Exception);
        }
    }
}