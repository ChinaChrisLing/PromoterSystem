using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WJ.PromoterSys.Web.Model.Models.Login
{
    public class LoginModel
    {
        public string AccountID { get; set; }
        public string UserName { get; set; }
        public string RoleName { get; set; }
        public string RoleId { get; set; }
        public string IsPrimary { get; set; }
    }
}
