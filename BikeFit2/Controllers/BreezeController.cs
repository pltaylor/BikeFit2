using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Security;
using BikeFit2.DataLayer;
using BikeFit2.Models;
using Breeze.ContextProvider;
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
        [Authorize(Roles = "Admin, MeasurementAdmin")]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            try
            {
                if (!User.IsInRole("Admin"))
                {
                    _ContextProvider.BeforeSaveEntitiesDelegate = AddNewRecord;
                }

                return _ContextProvider.SaveChanges(saveBundle);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return null;
        }

        private Dictionary<Type, List<EntityInfo>> AddNewRecord(Dictionary<Type, List<EntityInfo>> saveMap)
        {
            var tempAddList = new List<EntityInfo>();
            var tempRemoveList = new List<EntityInfo>();
            foreach (var map in saveMap)
            {
                if (map.Key.Name == "BikeSize")
                {
                    foreach (var entity in map.Value)
                    {
                        var newBikeSize = new BikeSize();
                        newBikeSize.Approved = false;
                        var bikeSize = (BikeSize)entity.Entity;
                        newBikeSize.BikeModelID = bikeSize.BikeModelID;
                        newBikeSize.BottomBracketDrop = bikeSize.BottomBracketDrop;
                        newBikeSize.EnteredDate = DateTime.Now;
                        newBikeSize.FrontCenter = bikeSize.FrontCenter;
                        newBikeSize.HeadTubeAngle = bikeSize.HeadTubeAngle;
                        newBikeSize.HeadTubeLength = bikeSize.HeadTubeLength;
                        newBikeSize.MaxSeatAngle = bikeSize.MaxSeatAngle;
                        newBikeSize.MinSeatAngle = bikeSize.MinSeatAngle;
                        newBikeSize.Reach = bikeSize.Reach;
                        newBikeSize.RearCenter = bikeSize.RearCenter;
                        newBikeSize.Size = bikeSize.Size;
                        newBikeSize.SizeID = Guid.NewGuid();
                        newBikeSize.SortOrder = bikeSize.SortOrder;
                        newBikeSize.Stack = bikeSize.Stack;
                        newBikeSize.WheelSize = bikeSize.WheelSize;
                        newBikeSize.UserID = User.Identity.Name;

                        var ei = _ContextProvider.CreateEntityInfo(newBikeSize);
                        tempAddList.Add(ei);

                        tempRemoveList.Add(entity);
                    }
                }
            }
            
            List<EntityInfo> fooInfos;
            if (!saveMap.TryGetValue(typeof(BikeSize), out fooInfos))
            {
                fooInfos = new List<EntityInfo>();
                saveMap.Add(typeof(BikeSize), fooInfos);
            }

            fooInfos.AddRange(tempAddList);

            for (int i = 0; i < tempRemoveList.Count; i++)
            {
                fooInfos.Remove(tempRemoveList[i]);
            }
            
            // return the updated saveMap
            return saveMap;
        }
    }
}