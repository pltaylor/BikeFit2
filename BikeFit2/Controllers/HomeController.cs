using System.Web.Mvc;

namespace BikeFit2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult FullTriBike()
        {
            return View();
        }

        public PartialViewResult FrameSelection()
        {
            return PartialView();
        }

        public ViewResult FrameComparerSlowtwitch()
        {
            return View("Index", "_SlowtwitchLayout");
        }
    }
}