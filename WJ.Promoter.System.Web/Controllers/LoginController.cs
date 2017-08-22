using System;
using System.Web.Mvc;
using WJ.PromoterSys.Web.Bill.login;
using WJ.PromoterSys.Web.Core.Common;
using WJ.PromoterSys.Web.Core.Extend;
using WJ.PromoterSys.Web.Core.Json;
using WJ.PromoterSys.Web.Core.Net;
using WJ.PromoterSys.Web.Core.OperatorProvider;
using WJ.PromoterSys.Web.Core.Security;
using WJ.PromoterSys.Web.Model.Models.Login;
using WJ.PromoterSys.Web.Model.Result;

namespace WJ.PromoterSys.Web.UI.Controllers
{
    [HandlerError]
    public class LoginController : Controller
    {
        [HttpGet]
        public virtual ActionResult Index()
        {
            var test = string.Format("{0:E2}", 1);
            return View();
        }
        [HttpGet]
        public ActionResult GetAuthCode()
        {
            return File(new VerifyCode().GetVerifyCode(), @"image/Gif");
        }
        [HttpGet]
        public ActionResult OutLogin()
        {
            Session.Abandon();
            Session.Clear();
            OperatorProvider.Provider.RemoveCurrent();
            return RedirectToAction("Index", "Login");
        }
        [HttpPost]
        [HandlerAjaxOnly]
        [HandlerError]
        public ActionResult CheckLogin(string username, string password, string code)
        {
            try
            {
                if (Session["session_verifycode"].IsEmpty() || code.ToLower() != Session["session_verifycode"].ToString())
                {
                    throw new Exception("验证码错误，请重新输入");
                }
                string msg = "";
                LoginModel LoginEntity = new LoginBusiness().CheckLogin(password, username, ref msg);
                if (LoginEntity != null)
                {
                    OperatorModel operatorModel = new OperatorModel();
                    operatorModel.UserId = LoginEntity.AccountID;
                    operatorModel.UserName = LoginEntity.UserName;
                    operatorModel.RoleId = LoginEntity.RoleId;
                    operatorModel.LoginIPAddress = Net.Ip;
                    operatorModel.LoginIPAddressName = Net.GetLocation(operatorModel.LoginIPAddress);
                    operatorModel.LoginTime = DateTime.Now;
                    operatorModel.LoginToken = DESEncrypt.Encrypt(Guid.NewGuid().ToString());
                    if (LoginEntity.IsPrimary == "1")
                    {
                        operatorModel.IsSystem = true;
                    }
                    else
                    {
                        operatorModel.IsSystem = false;
                    }
                    OperatorProvider.Provider.AddCurrent(operatorModel);
                    return Content(new AjaxResult { state = ResultType.success.ToString(), message = msg }.ToJson());
                }
                return Content(new AjaxResult { state = ResultType.warning.ToString(), message = msg }.ToJson());
            }
            catch (Exception ex)
            {
                return Content(new AjaxResult { state = ResultType.error.ToString(), message = ex.Message }.ToJson());
            }
        }
    }
}