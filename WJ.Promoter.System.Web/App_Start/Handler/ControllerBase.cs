
using System.Web.Mvc;
using WJ.PromoterSys.Web.Core.Json;
using WJ.PromoterSys.Web.Core.Log;
using WJ.PromoterSys.Web.Core.OperatorProvider;
using WJ.PromoterSys.Web.Model.Result;

namespace WJ.PromoterSys.Web.UI
{
    [HandlerLogin]
    public abstract class ControllerBase : Controller
    {
        public Log FileLog
        {
            get { return LogFactory.GetLogger(this.GetType().ToString()); }
        }

        /// <summary>
        /// 当前用户
        /// </summary>
        public OperatorModel CurrUser
        {
            get { return OperatorProvider.Provider.GetCurrent(); }
        }

        [HttpGet]
        [HandlerAuthorize]
        public virtual ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [HandlerAuthorize]
        public virtual ActionResult Form()
        {
            return View();
        }
        [HttpGet]
        [HandlerAuthorize]
        public virtual ActionResult Details()
        {
            return View();
        }
        [HttpGet]
        [HandlerAuthorize]
        public virtual ActionResult Default()
        {
            return View();
        }

        protected virtual ActionResult Success(string message)
        {
            return Content(new AjaxResult { state = ResultType.success.ToString(), message = message }.ToJson());
        }
        protected virtual ActionResult Success(string message, object data)
        {
            return Content(new AjaxResult { state = ResultType.success.ToString(), message = message, data = data }.ToJson());
        }
        protected virtual ActionResult Error(string message)
        {
            return Content(new AjaxResult { state = ResultType.error.ToString(), message = message }.ToJson());
        }


    }
}
