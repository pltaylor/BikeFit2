using System.Web.Mvc;

namespace BikeFit2.Controllers
{
    public class AerobarAdminController : Controller
    {
        // GET: AerobarAdmin
        [Authorize(Roles = "Admin")]
        public ActionResult Index()
        {
            return View();
        }
    }
}