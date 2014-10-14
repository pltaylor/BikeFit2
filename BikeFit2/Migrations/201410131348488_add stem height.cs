namespace BikeFit2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addstemheight : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Stems", "ClampHeight", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Stems", "ClampHeight");
        }
    }
}
