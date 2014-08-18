using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using BikeFit2.DataLayer;
using BikeFit2.Models;
using BikeFit2.Models.ViewModels;

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
            using (_Context)
            {
                var vm = new GeometryTableViewModel(_Context);

                return View("GeometryTables", "_SlowtwitchLayout", vm);
            }
        }

        public PartialViewResult GeometrySubTable(string manufacturer, string type)
        {
            using (_Context)
            {
                List<Manufacturer> manufacturers;
                if (manufacturer == "All")
                {
                    manufacturers = _Context.Manufacturers.Where(x => x.IsActive).ToList();
                }
                else
                {
                    manufacturers = _Context.Manufacturers.Where(x => x.IsActive).Where(m => m.Name == manufacturer).ToList();
                }

                foreach (var manu in manufacturers)
                {
                    if (type == "All")
                    {
                        manu.Models = manu.Models.OrderBy(m => m.Name).ToList();
                    }
                    else
                    {
                        manu.Models = manu.Models.Where(m => m.BikeType.Type == type).OrderBy(m => m.Name).ToList();
                    }


                    foreach (var model in manu.Models)
                    {
                        model.Sizes = model.Sizes.Where(m => m.Approved).OrderBy(m => m.SortOrder).ThenBy(m => m.Size).ToList();
                    }
                }

                return PartialView("GeometryTableSubView", manufacturers);
            }
        }
    }
}