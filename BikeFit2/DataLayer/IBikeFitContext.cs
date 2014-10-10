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
        DbSet<AerobarHeight> AerobarHeights { get; set; }
        DbSet<BaseBarWidth> BaseBarWidths { get; set; }
        DbSet<PadHeight> PadHeights { get; set; }
        DbSet<PadWidth> PadWidths { get; set; }
        DbSet<PadReach> PadReaches { get; set; }
        DbSet<Stem> Stems { get; set; }
    }
}