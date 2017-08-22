using System;
using System.Collections.Generic;
using WJ.PromoterSys.Web.Model.Models;
using WJ.PromoterSys.Web.Model.Models.Login;

namespace WJ.PromoterSys.Web.Data
{
    public interface ILoginService 
    {
        List<UserEntity> GetAllList();
        LoginModel CheckLogin(string UserPwd, string UserName, string IP, ref string ChvMsg);
        List<UserEntity> GetPageByProcList(int page = 1, int pageSize = 10);
    }
}
