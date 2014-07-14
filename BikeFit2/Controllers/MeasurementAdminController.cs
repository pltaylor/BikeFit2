using System.Web.Mvc;

namespace BikeFit2.Controllers
{
    public class MeasurementAdminController : Controller
    {
        //
        // GET: /Admin/
        [Authorize(Roles = "MeasurementAdmin, Admin")]
        public ActionResult Index()
        {
            return View();
        }
	}
}