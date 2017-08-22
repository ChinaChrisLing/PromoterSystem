using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WJ.PromoterSys.Web.Data.IModeServiceBase
{
    public abstract class IBaseService
    {
        public  string constr = ConfigurationManager.ConnectionStrings["PromoterDBContext"].ConnectionString;
    }
}
