using System.Data.Entity;
using BikeFit2.Models;

namespace BikeFit2.DataLayer
{
    public interface IBikeFitContext
    {
        DbSet<Manufacturer> Manufacturers { get; set; }
        DbSet<BikeModel> BikeModels { get; set; }
        DbSet<BikeSize> BikeSizes { get; set; }
        DbSet<BikeType> BikeTypes { get; set; }
    }
}