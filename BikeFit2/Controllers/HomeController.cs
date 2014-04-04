using System.Web.Mvc;
using BikeFit2.DataLayer;

namespace BikeFit2.Controllers
{
    public class HomeController : Controller
    {
        private IBikeFitContext _BikeFitContext;

        public HomeController(IBikeFitContext bikeFitContext)
        {
            _BikeFitContext = bikeFitContext;
        }

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
    }
}