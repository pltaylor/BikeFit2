using System.Collections.Generic;
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
            IList<AeroBarType> defaultAeroBarTypes = new List<AeroBarType>();

            defaultAeroBarTypes.Add(new AeroBarType { AeroBarTypeId = 1, Type = "Aerobar" });
            defaultAeroBarTypes.Add(new AeroBarType { AeroBarTypeId = 2, Type = "Basebar" });
            defaultAeroBarTypes.Add(new AeroBarType { AeroBarTypeId = 3, Type = "AerobarAndBasebar" });
            defaultAeroBarTypes.Add(new AeroBarType { AeroBarTypeId = 4, Type = "AerobarAndBasebarAndStem" });

            foreach (var std in defaultAeroBarTypes)
                context.AeroBarTypes.Add(std);

            //All standards will
            base.Seed(context);

        }
    }
}
