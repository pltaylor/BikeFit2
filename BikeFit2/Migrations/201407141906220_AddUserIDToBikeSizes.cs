namespace BikeFit2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUserIDToBikeSizes : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BikeSizes", "UserID", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.BikeSizes", "UserID");
        }
    }
}
