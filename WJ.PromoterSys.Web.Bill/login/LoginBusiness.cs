
using WJ.PromoterSys.Web.Core.Net;
using WJ.PromoterSys.Web.Data;
using WJ.PromoterSys.Web.Model.Models.Login;
using WJ.PromoterSys.Web.Services.ModelServices;

namespace WJ.PromoterSys.Web.Bill.login
{
    public class LoginBusiness
    {
        private ILoginService us = new LoginService();
        public LoginModel CheckLogin(string UserPwd, string UserName,ref string msg)
        {
            string IP = Net.Ip;
            return us.CheckLogin(UserPwd, UserName, IP,ref msg);
        }
    }
}
