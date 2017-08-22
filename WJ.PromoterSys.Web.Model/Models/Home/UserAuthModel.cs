using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WJ.PromoterSys.Web.Model.Models.Home
{
    public class UserAuthModel
    {
        public string Id { get; set; }
        public string Pid { get; set; }
        public string ModuleName { get; set; }
        public string ModuleValue { get; set; }
        public string Sequence { get; set; }
        public string Icon { get; set; }
        public List<UserAuthModel> Children { get; set; }
    }
}
