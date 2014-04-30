using BikeFit2.DataLayer;
using BikeFit2.Models;

namespace BikeFit2.Migrations
{
    using System.Data.Entity.Migrations;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;

    internal sealed class Configuration : DbMigrationsConfiguration<BikeFitContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(BikeFitContext context)
        {
            //var configuration = new Configuration();
            //var migrator = new DbMigrator(configuration);
            //migrator.Update();

            //AddUserAndRole(context);

            ////  This method will be called after migrating to the latest version.

            ////  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            ////  to avoid creating duplicate seed data. E.g.
            ////
            ////    context.People.AddOrUpdate(
            ////      p => p.FullName,
            ////      new Person { FullName = "Andrew Peters" },
            ////      new Person { FullName = "Brice Lambson" },
            ////      new Person { FullName = "Rowan Miller" }
            ////    );
            ////
        }

        bool AddUserAndRole(BikeFitContext context)
        {
            var rm = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            IdentityResult ir = rm.Create(new IdentityRole("Administrator"));
            IdentityResult ir2 = rm.Create(new IdentityRole("Manufacturer"));
            
            return ir.Succeeded;
        }
    }
}
