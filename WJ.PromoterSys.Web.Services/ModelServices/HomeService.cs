using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using System.Linq;
using WJ.PromoterSys.Web.Model.Models.Home;
using WJ.PromoterSys.Web.Data.IModeServiceBase;
using System;

namespace WJ.PromoterSys.Web.Services.ModelServices
{
    public class HomeService : IBaseService, IHomeService
    {
        /// <summary>
        /// 获取当前用户拥有的模块权限（首页左侧菜单使用）
        /// </summary>
        /// <param name="AccountId"></param>
        /// <param name="ModulePId"></param>
        /// <returns></returns>
        public List<UserAuthModel> GetAuthModuleByPId(string AccountId, string ModulePId)
        {

            var list = new List<UserAuthModel>();
            try
            {
                using (SqlConnection conn = new SqlConnection(constr))
                {
                    conn.Open();
                    DynamicParameters parm = new DynamicParameters();
                    parm.Add("IV_AccountID", AccountId);
                    parm.Add("IV_Pid", ModulePId);
                    //parm.Add("rt", null, DbType.Int32, ParameterDirection.ReturnValue, 4);
                    parm.Add("OV_RetrunMsg", null, DbType.String, ParameterDirection.Output, 128);
                    list = conn.Query<UserAuthModel>("PrWeb_Agms_GetModuleID_ByAccountID", parm, commandType: CommandType.StoredProcedure).AsList();
                    conn.Close();
                }

                return list;
            }
            catch (System.Exception)
            {

                throw;
            }

        }


        /// <summary>
        ///  数据统计（流水，利润，代理数）
        /// </summary>
        /// <param name="AccountId">账号ID</param>
        /// <returns></returns>
        public HomeOverViewModel GetDataStatistics(string AccountId)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(constr))
                {
                    DynamicParameters parm = new DynamicParameters();
                    parm.Add("IV_AccountID", AccountId);
                    parm.Add("rt", null, DbType.Int32, ParameterDirection.ReturnValue, 4);
                    parm.Add("OV_RetrunMsg", null, DbType.String, ParameterDirection.Output, 128);
                    return conn.Query<HomeOverViewModel>("PrWeb_Agms_DataCenter_OverView", parm, commandType: CommandType.StoredProcedure).FirstOrDefault();
                }
            }
            catch (System.Exception)
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

            var list = new List<Flow_SumModel>();
            try
            {
                using (SqlConnection conn = new SqlConnection(constr))
                {
                    conn.Open();
                    DynamicParameters parm = new DynamicParameters();
                    parm.Add("IV_AccountID", AccountId);
                    parm.Add("IV_GameID", 0);
                    parm.Add("IV_BeginTime", "1970/01/01");
                    parm.Add("IV_EndTime",DateTime.Now.ToShortDateString());
                    //parm.Add("Limit", AccountId);
                    //parm.Add("OffSet", ModulePId);
                    //parm.Add("SortBy", AccountId);
                    //parm.Add("SortRule", ModulePId);
                    parm.Add("rt", null, DbType.Int32, ParameterDirection.ReturnValue, 4);
                    parm.Add("OV_RowCount", null, DbType.Int32, ParameterDirection.ReturnValue, 4);
                    parm.Add("OV_RetrunMsg", null, DbType.String, ParameterDirection.Output, 128);
                    list = conn.Query<Flow_SumModel>("PrWeb_Agms_DataCenter_Flow_Sum", parm, commandType: CommandType.StoredProcedure).AsList();
                    conn.Close();
                }

                return list;
            }
            catch (System.Exception)
            {

                throw;
            }

        }
    }
}

