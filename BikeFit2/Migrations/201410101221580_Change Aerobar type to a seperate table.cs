namespace BikeFit2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeAerobartypetoaseperatetable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AeroBarTypes",
                c => new
                    {
                        AeroBarTypeId = c.Int(nullable: false, identity: true),
                        Type = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.AeroBarTypeId);
            
            AddColumn("dbo.AerobarModels", "AeroBarTypeId", c => c.Int(nullable: false));
            CreateIndex("dbo.AerobarModels", "AeroBarTypeId");
            AddForeignKey("dbo.AerobarModels", "AeroBarTypeId", "dbo.AeroBarTypes", "AeroBarTypeId", cascadeDelete: true);
            DropColumn("dbo.AerobarModels", "AeroBarType");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AerobarModels", "AeroBarType", c => c.Int(nullable: false));
            DropForeignKey("dbo.AerobarModels", "AeroBarTypeId", "dbo.AeroBarTypes");
            DropIndex("dbo.AerobarModels", new[] { "AeroBarTypeId" });
            DropColumn("dbo.AerobarModels", "AeroBarTypeId");
            DropTable("dbo.AeroBarTypes");
        }
    }
}
