using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;
using BikeFit2.DataLayer;

namespace BikeFit2.Models.ViewModels
{
    public class GeometryTableViewModel
    {
        public GeometryTableViewModel(BikeFitContext context, string manufacturerName = "All", string typeName = "All")
        {
            using(context)
            {
                ManufacturerList = new List<SelectListItem> {new SelectListItem {Text = "All", Value = "All"}};
                Manufacturer = "All";

                if (manufacturerName == "All")
                {
                    Manufacturers = context.Manufacturers.Where(x => x.IsActive).ToList();
                }
                else
                {
                    Manufacturers =
                        context.Manufacturers.Where(x => x.IsActive).Where(m => m.Name == manufacturerName).ToList();
                }

                foreach (var manufacturer in Manufacturers)
                {
                    ManufacturerList.Add(new SelectListItem
                    {
                        Text = manufacturer.Name,
                        Value = manufacturer.ManufacturerID.ToString()
                    });

                    if (typeName == "All")
                    {
                        manufacturer.Models = manufacturer.Models.OrderBy(m => m.Name).ToList();
                    }
                    else
                    {
                        manufacturer.Models =
                            manufacturer.Models.Where(m => m.BikeType.Type == typeName).OrderBy(m => m.Name).ToList();
                    }


                    foreach (var model in manufacturer.Models)
                    {
                        model.Sizes =
                            model.Sizes.Where(m => m.Approved).OrderBy(m => m.SortOrder).ThenBy(m => m.Size).ToList();
                    }
                }

                BikeTypesList = new List<SelectListItem> {new SelectListItem {Text = "All", Value = "All"}};
                BikeType = "All";

                var bikeTypes = context.BikeTypes;
                foreach (var type in bikeTypes)
                {
                    BikeTypesList.Add(new SelectListItem
                    {
                        Text = type.Type,
                        Value = type.BikeTypeId.ToString(CultureInfo.InvariantCulture)
                    });
                }
            }
        }

        public List<Manufacturer> Manufacturers { get; private set; }

        public string Manufacturer { get; set; }

        public List<SelectListItem> ManufacturerList { get; set; }

        public string BikeType { get; set; }

        public List<SelectListItem> BikeTypesList { get; set; }
    }
}