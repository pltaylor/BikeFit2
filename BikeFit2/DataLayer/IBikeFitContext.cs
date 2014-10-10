using System.Data.Entity;
using BikeFit2.Models;
using BikeFit2.Models.Aerobar;

namespace BikeFit2.DataLayer
{
    public interface IBikeFitContext
    {
        DbSet<Manufacturer> Manufacturers { get; set; }
        DbSet<BikeModel> BikeModels { get; set; }
        DbSet<BikeSize> BikeSizes { get; set; }
        DbSet<BikeType> BikeTypes { get; set; }
        DbSet<AerobarManufacturer> AeroBarManufacturers { get; set; }
        DbSet<AerobarModel> AerobarModels { get; set; }
        DbSet<AeroBarType> AeroBarTypes { get; set; }
    }
}