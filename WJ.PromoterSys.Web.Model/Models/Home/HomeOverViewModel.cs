using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WJ.PromoterSys.Web.Model.Models.Home
{
    public class HomeOverViewModel
    {
        public string WeekFlow { get; set; }
        public string MonthFlow { get; set; }
        public string YearFlow { get; set; }
        public string TotalFlow { get; set; }
        public string WeekProfit { get; set; }
        public string MonthProfit { get; set; }
        public string YearProfit { get; set; }
        public string TotalProfit { get; set; }
        public string AgentLevel1Count { get; set; }
        public string AgentLevel2Count { get; set; }
        public string AgentLevel3Count { get; set; }
        public string AgentTotalCount { get; set; }
    }
}
