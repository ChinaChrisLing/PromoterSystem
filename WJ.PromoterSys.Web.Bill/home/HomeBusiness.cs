using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WJ.PromoterSys.Web.Data.IModeServiceBase;
using WJ.PromoterSys.Web.Model.Models.Home;
using WJ.PromoterSys.Web.Services.ModelServices;

namespace WJ.PromoterSys.Web.Bill.home
{
    public class HomeBusiness
    {
        private IHomeService homeservice = new HomeService();

        /// <summary>
        ///  获取当前用户拥有的模块权限（首页左侧菜单使用）
        /// </summary>
        /// <param name="AccountId"></param>
        /// <param name="ModulePId"></param>
        /// <returns></returns>
        public List<UserAuthModel> GetAuthModuleByPId(string AccountId, string ModulePId)
        {
            try
            {
                List<UserAuthModel> lst = homeservice.GetAuthModuleByPId(AccountId, ModulePId);
                foreach (UserAuthModel ua in lst)
                {
                    ua.Children = homeservice.GetAuthModuleByPId(AccountId, ua.Id);
                }
                return lst;
            }
            catch (Exception)
            {

                throw;
            }

        }

        /// <summary>
        /// 数据统计（流水，利润，代理数）
        /// </summary>
        /// <param name="AccountId"></param>
        /// <returns></returns>
        public HomeOverViewModel GetDataStatistics(string AccountId)
        {
            try
            {
                return homeservice.GetDataStatistics(AccountId);
            }
            catch (Exception)
            {

                throw;
            }

        }

        /// <summary>
        /// 充值一览（各产品流水统计（占比））
        /// </summary>
        /// <param name="AccountId"></param>
        /// <returns></returns>
        public List<Flow_SumModel> PrWeb_Agms_DataCenter_Flow_Sum(string AccountId)
        {
            return homeservice.PrWeb_Agms_DataCenter_Flow_Sum(AccountId);
        }
    }
}
