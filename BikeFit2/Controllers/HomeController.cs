﻿using System.Web.Mvc;
using BikeFit2.DataLayer;
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
            var vm = new GeometryTableViewModel(_Context);

            return View("GeometryTables", "_SlowtwitchLayout", vm);
        }
    }
}