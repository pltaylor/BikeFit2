using System.Web.Optimization;

namespace BikeFit2
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));
            
            bundles.Add(new ScriptBundle("~/bundles/vendor").Include(
                      "~/Scripts/respond.js",
                    "~/scripts/knockout-3.2.0.debug.js",
                    "~/scripts/breeze.debug.js"));

            bundles.Add(new ScriptBundle("~/bundles/frames.js").Include(
                "~/scripts/frames.js"));

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                      "~/Content/site.css",
                      "~/Content/frame.css",
                      "~/Content/toastr.css"));

            bundles.Add(new StyleBundle("~/bundles/frameCss").Include(
                      "~/Content/frame.css",
                       "~/Content/slowtwitch.css",
                      "~/Content/toastr.css"));
        }
    }
}
