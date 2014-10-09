namespace BikeFit2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddAerobarmodelname : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AerobarModels", "ModelName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AerobarModels", "ModelName");
        }
    }
}
