using System;
using System.Linq;
using System.Web.Http;

using BikeFit2.DataLayer;
using BikeFit2.Models;
using Breeze.WebApi2;
using Breeze.ContextProvider.EF6;
using Newtonsoft.Json.Linq;
using SaveResult = Breeze.ContextProvider.SaveResult;

namespace BikeFit2.Controllers
{
    [BreezeController]
    public class BreezeController : ApiController
    {
        readonly EFContextProvider<BikeFitContext> _ContextProvider = new EFContextProvider<BikeFitContext>();
        
        [HttpGet]
        public string Metadata()
        {
            return _ContextProvider.Metadata();
        }

        [HttpGet]
        public IQueryable<Manufacturer> Manufacturers()
        {
            return _ContextProvider.Context.Manufacturers;
        }

        [HttpGet]
        public IQueryable<BikeType> BikeTypes()
        {
            return _ContextProvider.Context.BikeTypes;
        }

        [HttpGet]
        public IQueryable<BikeModel> BikeModels()
        {
            return _ContextProvider.Context.BikeModels;
        }

        [HttpGet]
        public IQueryable<BikeSize> BikeSizes()
        {
            return _ContextProvider.Context.BikeSizes;
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            try
            {
                return _ContextProvider.SaveChanges(saveBundle);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return null;
        }
	}
}