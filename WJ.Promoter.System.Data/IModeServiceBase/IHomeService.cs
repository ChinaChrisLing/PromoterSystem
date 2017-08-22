
using System.Collections.Generic;
using WJ.PromoterSys.Web.Model.Models.Home;

namespace WJ.PromoterSys.Web.Data.IModeServiceBase
{
    public interface IHomeService
    {
        List<UserAuthModel> GetAuthModuleByPId(string AccountId, string ModulePId);
        HomeOverViewModel GetDataStatistics(string AccountId);
        List<Flow_SumModel> PrWeb_Agms_DataCenter_Flow_Sum(string AccountId);
    }
}
