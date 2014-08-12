using System.Linq;
using System.Web.Mvc;
using BikeFit2.DataLayer;

namespace BikeFit2.Controllers
{
    public class HomeController : Controller
    {
        readonly BikeFitContext _Context = new BikeFitContext();

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

        public ViewResult GeometryTables()
        {
            var manufacturers = _Context.Manufacturers.Where(x=>x.IsActive);
            return View("GeometryTables", "_SlowtwitchLayout", manufacturers.ToList());
        }
    }
}