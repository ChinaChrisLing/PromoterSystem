using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace WJ.PromoterSys.Web.Data.DBContext
{
    /// <summary>
    /// des 数据上下文
    /// author lingliang 20170713
    /// </summary>
    public class PromoterDBContext
    {
        public static  string connstring = ConfigurationManager.ConnectionStrings["PromoterDBContext"].ConnectionString;

    }
}
