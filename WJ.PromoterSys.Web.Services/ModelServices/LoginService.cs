using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using WJ.PromoterSys.Web.Model.Models;
using Dapper;
using DapperExtensions;
using System.Configuration;
using WJ.PromoterSys.Web.Data;
using WJ.PromoterSys.Web.Model.Models.Login;
using WJ.PromoterSys.Web.Data.IModeServiceBase;

namespace WJ.PromoterSys.Web.Services.ModelServices
{
    public class LoginService : IBaseService, ILoginService
    {
        /// <summary>
        /// 查询所有用户
        /// </summary>
        /// <returns></returns>
        public List<UserEntity> GetAllList()
        {
            var list = new List<UserEntity>();
            //string sql = @"select Id,UserName,Nation,TrueName,Birthday,LocalAddressGender from UserInfo";
            using (SqlConnection conn = new SqlConnection(constr))
            {
                conn.Open();
                //标准写法
                //list = conn.Query<UserInfo>(sql,commandType: CommandType.Text).AsList();
                //dapper扩展写法
                list = conn.GetList<UserEntity>().AsList();
                conn.Close();
            }
            return list;
        }

        /// <summary>
        /// 检测登入时候的用户和密码
        /// </summary>
        /// <param name="UserPwd"></param>
        /// <param name="UserName"></param>
        /// <param name="IP"></param>
        /// <returns></returns>
        public LoginModel CheckLogin(string UserPwd, string UserName, string IP,ref string ChvMsg)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(constr))
                {
                    conn.Open();
                    DynamicParameters parm = new DynamicParameters();
                    parm.Add("UserName", UserName);
                    parm.Add("UserPwd", UserPwd);
                    parm.Add("LoginIP", IP);
                    parm.Add("rt", null, DbType.Int32, ParameterDirection.ReturnValue, 4);
                    parm.Add("ChvMsg", null, DbType.String, ParameterDirection.Output, 128);
                    var login= conn.Query<LoginModel>("PrWeb_Agms_UserLogin", parm, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    ChvMsg = parm.Get<string>("ChvMsg");
                    return login;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        /// <summary>
        /// 采用存储过程分页
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public List<UserEntity> GetPageByProcList(int page = 1, int pageSize = 10)
        {

            var list = new List<UserEntity>();
            //string sql = @"select Id,UserName,Nation,TrueName,Birthday,LocalAddressGender from UserInfo";
            using (SqlConnection conn = new SqlConnection(constr))
            {
                conn.Open();
                DynamicParameters parm = new DynamicParameters();
                parm.Add("viewName", "UserInfo");
                parm.Add("fieldName", "*");
                parm.Add("keyName", "Id");
                parm.Add("pageSize", pageSize);
                parm.Add("pageNo", page);
                parm.Add("orderString", "Id");
                parm.Add("recordTotal", 0, DbType.Int32, ParameterDirection.Output);
                //参数名得和存储过程的变量名相同（参数可以跳跃传，键值对方式即可）
                //强类型
                //list = conn.Query<UserInfo>("P_GridViewPager", new { viewName = "Edu_StudentSelectedCourse", fieldName = "*", keyName = "Id", pageSize = 20, pageNo = 1, orderString = "id" }, commandType: CommandType.StoredProcedure).ToList();
                //标准写法
                //list = conn.Query<UserInfo>(sql,commandType: CommandType.Text).AsList();
                //dapper扩展写法
                //list = conn.GetList<UserInfo>().AsList();
                list = conn.Query<UserEntity>("ProcViewPager", parm, commandType: CommandType.StoredProcedure).AsList();
                int totalCount = parm.Get<int>("@recordTotal");//返回总页数
                conn.Close();
            }
            return list;
        }      
    }
}

