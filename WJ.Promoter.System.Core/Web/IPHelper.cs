using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WJ.PromoterSys.Web.Core.Web
{
   public  class IPHelper
    {
        public static string GetIPAdderss()
        {
          return  PubEvent.EventFace.GetRealIPAddress();
        }
    }
}
