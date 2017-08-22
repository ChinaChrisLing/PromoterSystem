
using WJ.PromoterSys.Web.Core.Json;
using WJ.PromoterSys.Web.Core.Security;
using WJ.PromoterSys.Web.Core.Web;


namespace WJ.PromoterSys.Web.Core.OperatorProvider
{
    public class OperatorProvider
    {
        public static OperatorProvider Provider
        {
            get { return new OperatorProvider(); }
        }
        private string LoginUserKey = "loginuserkey_2017";
        private string LoginProvider = WJ.PromoterSys.Web.Core.Configs.Configs.GetValue("LoginProvider");

        public OperatorModel GetCurrent()
        {
            OperatorModel operatorModel = new OperatorModel();
            if (LoginProvider == "Cookie")
            {
                operatorModel = DESEncrypt.Decrypt(WebHelper.GetCookie(LoginUserKey).ToString()).ToObject<OperatorModel>();
            }
            else
            {
                operatorModel = DESEncrypt.Decrypt(WebHelper.GetSession(LoginUserKey).ToString()).ToObject<OperatorModel>();
            }
            return operatorModel;
        }
        public void AddCurrent(OperatorModel operatorModel)
        {
            if (LoginProvider == "Cookie")
            {
                try
                {
                    string obj = operatorModel.ToJson();
                    WebHelper.WriteCookie(LoginUserKey, DESEncrypt.Encrypt(obj), 60);
                }
                catch (System.Exception ex)
                {

                    throw ex;
                }
                
            }
            else
            {
                WebHelper.WriteSession(LoginUserKey, DESEncrypt.Encrypt(operatorModel.ToJson()));
            }
            WebHelper.WriteCookie("mac", Md5.md5(WJ.PromoterSys.Web.Core.Net.Net.GetMacByNetworkInterface().ToJson(), 32));
            WebHelper.WriteCookie("licence", Licence.GetLicence());
        }
        public void RemoveCurrent()
        {
            if (LoginProvider == "Cookie")
            {
                WebHelper.RemoveCookie(LoginUserKey.Trim());
            }
            else
            {
                WebHelper.RemoveSession(LoginUserKey.Trim());
            }
        }
    }
}
