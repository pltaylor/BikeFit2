namespace BikeFit2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddEnteredDateApproved : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BikeSizes", "EnteredDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.BikeSizes", "Approved", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.BikeSizes", "Approved");
            DropColumn("dbo.BikeSizes", "EnteredDate");
        }
    }
}
