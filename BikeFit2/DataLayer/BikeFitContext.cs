using System.Data.Entity;
using BikeFit2.Models;

namespace BikeFit2.DataLayer
{
    public class BikeFitContext : DbContext 
    {
        public BikeFitContext() : base("AzureConnection")
        {
        }

        public DbSet<Manufacturer> Manufacturers { get; set; }

        public DbSet<BikeModel> BikeModels { get; set; }

        public DbSet<BikeSize> BikeSizes { get; set; }

        public DbSet<BikeType> BikeTypes { get; set; }
    }
}