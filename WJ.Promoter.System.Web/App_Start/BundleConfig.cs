using System.Web;
using System.Web.Optimization;

namespace WJ.PromoterSys.Web.UI
{
    public class BundleConfig
    {
        // 有关绑定的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/bundles/scriptHomeFirst").Include(
                "~/Content/js/jquery/jquery-2.js"
                , "~/Content/js/bootstrap/bootstrap.js"
                , "~/Content/js/dialog/dialog.js"
                , "~/Content/js/cookie/jquerycookie.js"
                , "~/Content/js/framework-ui.js"
                , "~/Content/js/framework-clientdata.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/scriptHomeSecond").Include("~/Content/js/index.js", "~/Content/js/indextab.js", "~/Content/js/loading/pace.js"));

            bundles.Add(new StyleBundle("~/bundles/cssHomeFirst").Include(
                        "~/Content/css/framework-font.css"
                        , "~/Content/js/bootstrap/bootstrap.css"
                        , "~/Content/css/framework-theme.css"
                        ));

            bundles.Add(new StyleBundle("~/bundles/cssLoginFirst").Include("~/Content/css/framework-font.css", "~/Content/css/framework-login.css"));
            bundles.Add(new ScriptBundle("~/bundles/scriptLoginfirst").Include("~/Content/js/jquery/jquery-2.js", "~/Content/js/cookie/jquerycookie.js", "~/Content/js/md5/jquery.md5.js"));


            bundles.Add(new ScriptBundle("~/bundles/scriptAboutFirst").Include(
    "~/Content/js/jquery/jquery-2.js"
    , "~/Content/js/bootstrap/bootstrap.js"
    , "~/Content/js/framework-ui.js"
    ));


            bundles.Add(new StyleBundle("~/bundles/cssAboutFirst").Include(
                        "~/Content/css/framework-font.css"
                        , "~/Content/css/framework-ui.css"
                        , "~/Content/css/framework-theme.css"
                        , "~/Content/css/framework-about.css"
                        ));






        }
    }
}
