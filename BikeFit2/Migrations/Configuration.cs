using BikeFit2.Models.Aerobar;

namespace BikeFit2.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<DataLayer.BikeFitContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(DataLayer.BikeFitContext context)
        {
            context.AeroBarTypes.AddOrUpdate(
              p => p.Type,
              new AeroBarType { AeroBarTypeId = 1, Type = "Aerobar" },
              new AeroBarType { AeroBarTypeId = 2, Type = "Basebar" },
              new AeroBarType { AeroBarTypeId = 3, Type = "Aerobar & Basebar" },
              new AeroBarType { AeroBarTypeId = 4, Type = "Aerobar & Basebar & Stem" }
            );

            context.AeroBarManufacturers.AddOrUpdate(
                m => m.Name,
                new AerobarManufacturer { Name = "Tririg" },
                new AerobarManufacturer { Name = "Zipp" },
                new AerobarManufacturer { Name = "3T" },
                new AerobarManufacturer { Name = "Profile Design" },
                new AerobarManufacturer { Name = "Vision" });
        }
    }
}
