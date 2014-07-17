using System.Data.Entity;
using BikeFit2.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace BikeFit2.DataLayer
{
    public class BikeFitContext : IdentityDbContext<IdentityUser>, IBikeFitContext
    {

        public BikeFitContext() :  base("DefaultConnection")
        {
        }

        public DbSet<Manufacturer> Manufacturers { get; set; }

        public DbSet<BikeModel> BikeModels { get; set; }

        public DbSet<BikeSize> BikeSizes { get; set; }

        public DbSet<BikeType> BikeTypes { get; set; }
    }
}