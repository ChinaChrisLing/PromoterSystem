using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WJ.PromoterSys.Web.Model.Models
{
    public class UserEntity
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string UserPwd { get; set; }
        public string UserGroupId { get; set; }
        public DateTime? CreateTime { get; set; }
        public string UserType { get; set; }
        public string IsValid { get; set; }
    }


    

}
