using System.Web.Mvc;
using WJ.PromoterSys.Web.Bill.home;
using WJ.PromoterSys.Web.Core.Json;
using WJ.PromoterSys.Web.Model.Result;
using WJ.PromoterSys.Web.UI;
namespace NFine.Web.Controllers
{
    [HandlerLogin]
    public class HomeController : WJ.PromoterSys.Web.UI.ControllerBase
    {
        private HomeBusiness hb = new HomeBusiness();

        /// <summary>
        /// 左侧栏的显示数据
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [HandleError]
        public ActionResult GetCurrentUserAuthModule()
        {
            return Content(new AjaxResult { state = ResultType.success.ToString(),data = hb.GetAuthModuleByPId(CurrUser.UserId,"0"), message = "" }.ToJson());
        }

        /// <summary>
        /// 统计数据（流水，利润，代理数）
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [HandleError]
        public  ActionResult GetDataStatistics()
        {
            return Content(new AjaxResult { state = ResultType.success.ToString(), data = hb.GetDataStatistics(CurrUser.UserId), message = "" }.ToJson());
        }

        /// <summary>
        /// 充值一览（各产品流水统计（占比））
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [HandleError]
        public ActionResult EachProductFlowStatistics_Pie()
        {
            return Content(new AjaxResult {state=ResultType.success.ToString(),data=hb.PrWeb_Agms_DataCenter_Flow_Sum(CurrUser.UserId),message="" }.ToJson());
        }

    }
}
