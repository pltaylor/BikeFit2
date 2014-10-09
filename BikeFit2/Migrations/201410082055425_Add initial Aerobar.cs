namespace BikeFit2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddinitialAerobar : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AerobarManufacturers",
                c => new
                    {
                        ManufacturerID = c.Guid(nullable: false),
                        Name = c.String(),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ManufacturerID);
            
            CreateTable(
                "dbo.AerobarModels",
                c => new
                    {
                        AerobarID = c.Guid(nullable: false),
                        AerobarManufacturerID = c.Guid(nullable: false),
                        AeroBarType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.AerobarID)
                .ForeignKey("dbo.AerobarManufacturers", t => t.AerobarManufacturerID, cascadeDelete: true)
                .Index(t => t.AerobarManufacturerID);
            
            CreateTable(
                "dbo.AerobarHeights",
                c => new
                    {
                        AerobarHeightID = c.Guid(nullable: false),
                        Height = c.Double(nullable: false),
                        AerobarID = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.AerobarHeightID)
                .ForeignKey("dbo.AerobarModels", t => t.AerobarID, cascadeDelete: true)
                .Index(t => t.AerobarID);
            
            CreateTable(
                "dbo.BaseBarWidths",
                c => new
                    {
                        BaseBarWidthID = c.Guid(nullable: false),
                        Width = c.Double(nullable: false),
                        AerobarID = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.BaseBarWidthID)
                .ForeignKey("dbo.AerobarModels", t => t.AerobarID, cascadeDelete: true)
                .Index(t => t.AerobarID);
            
            CreateTable(
                "dbo.PadHeights",
                c => new
                    {
                        PadHeightID = c.Guid(nullable: false),
                        Height = c.Double(nullable: false),
                        AerobarID = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.PadHeightID)
                .ForeignKey("dbo.AerobarModels", t => t.AerobarID, cascadeDelete: true)
                .Index(t => t.AerobarID);
            
            CreateTable(
                "dbo.PadReaches",
                c => new
                    {
                        PadReachID = c.Guid(nullable: false),
                        Reach = c.Double(nullable: false),
                        AerobarID = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.PadReachID)
                .ForeignKey("dbo.AerobarModels", t => t.AerobarID, cascadeDelete: true)
                .Index(t => t.AerobarID);
            
            CreateTable(
                "dbo.PadWidths",
                c => new
                    {
                        PadWidthID = c.Guid(nullable: false),
                        Width = c.Double(nullable: false),
                        AerobarID = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.PadWidthID)
                .ForeignKey("dbo.AerobarModels", t => t.AerobarID, cascadeDelete: true)
                .Index(t => t.AerobarID);
            
            CreateTable(
                "dbo.Stems",
                c => new
                    {
                        StemID = c.Guid(nullable: false),
                        Length = c.Double(nullable: false),
                        Angle = c.Double(nullable: false),
                        AerobarID = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.StemID)
                .ForeignKey("dbo.AerobarModels", t => t.AerobarID, cascadeDelete: true)
                .Index(t => t.AerobarID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Stems", "AerobarID", "dbo.AerobarModels");
            DropForeignKey("dbo.PadWidths", "AerobarID", "dbo.AerobarModels");
            DropForeignKey("dbo.PadReaches", "AerobarID", "dbo.AerobarModels");
            DropForeignKey("dbo.PadHeights", "AerobarID", "dbo.AerobarModels");
            DropForeignKey("dbo.BaseBarWidths", "AerobarID", "dbo.AerobarModels");
            DropForeignKey("dbo.AerobarModels", "AerobarManufacturerID", "dbo.AerobarManufacturers");
            DropForeignKey("dbo.AerobarHeights", "AerobarID", "dbo.AerobarModels");
            DropIndex("dbo.Stems", new[] { "AerobarID" });
            DropIndex("dbo.PadWidths", new[] { "AerobarID" });
            DropIndex("dbo.PadReaches", new[] { "AerobarID" });
            DropIndex("dbo.PadHeights", new[] { "AerobarID" });
            DropIndex("dbo.BaseBarWidths", new[] { "AerobarID" });
            DropIndex("dbo.AerobarHeights", new[] { "AerobarID" });
            DropIndex("dbo.AerobarModels", new[] { "AerobarManufacturerID" });
            DropTable("dbo.Stems");
            DropTable("dbo.PadWidths");
            DropTable("dbo.PadReaches");
            DropTable("dbo.PadHeights");
            DropTable("dbo.BaseBarWidths");
            DropTable("dbo.AerobarHeights");
            DropTable("dbo.AerobarModels");
            DropTable("dbo.AerobarManufacturers");
        }
    }
}
