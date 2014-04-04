namespace BikeFit2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Intial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BikeModels",
                c => new
                    {
                        BikeModelID = c.Guid(nullable: false),
                        ManufactuerID = c.Guid(nullable: false),
                        BikeTypeId = c.Int(nullable: false),
                        Name = c.String(),
                        ManufacturedStartDate = c.DateTime(nullable: false, storeType: "date"),
                        ManufacturedEndDate = c.DateTime(nullable: false, storeType: "date"),
                    })
                .PrimaryKey(t => t.BikeModelID)
                .ForeignKey("dbo.BikeTypes", t => t.BikeTypeId, cascadeDelete: true)
                .ForeignKey("dbo.Manufacturers", t => t.ManufactuerID, cascadeDelete: true)
                .Index(t => t.ManufactuerID)
                .Index(t => t.BikeTypeId);
            
            CreateTable(
                "dbo.BikeTypes",
                c => new
                    {
                        BikeTypeId = c.Int(nullable: false, identity: true),
                        Type = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.BikeTypeId);
            
            CreateTable(
                "dbo.Manufacturers",
                c => new
                    {
                        ManufacturerID = c.Guid(nullable: false),
                        Name = c.String(),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ManufacturerID);
            
            CreateTable(
                "dbo.BikeSizes",
                c => new
                    {
                        SizeID = c.Guid(nullable: false),
                        BikeModelID = c.Guid(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        Size = c.String(),
                        WheelSize = c.Int(nullable: false),
                        HeadTubeAngle = c.Double(nullable: false),
                        BottomBracketDrop = c.Double(nullable: false),
                        HeadTubeLength = c.Double(nullable: false),
                        FrontCenter = c.Double(nullable: false),
                        RearCenter = c.Double(nullable: false),
                        Stack = c.Double(nullable: false),
                        Reach = c.Double(nullable: false),
                        MaxSeatAngle = c.Double(nullable: false),
                        MinSeatAngle = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.SizeID)
                .ForeignKey("dbo.BikeModels", t => t.BikeModelID, cascadeDelete: true)
                .Index(t => t.BikeModelID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BikeSizes", "BikeModelID", "dbo.BikeModels");
            DropForeignKey("dbo.BikeModels", "ManufactuerID", "dbo.Manufacturers");
            DropForeignKey("dbo.BikeModels", "BikeTypeId", "dbo.BikeTypes");
            DropIndex("dbo.BikeSizes", new[] { "BikeModelID" });
            DropIndex("dbo.BikeModels", new[] { "BikeTypeId" });
            DropIndex("dbo.BikeModels", new[] { "ManufactuerID" });
            DropTable("dbo.BikeSizes");
            DropTable("dbo.Manufacturers");
            DropTable("dbo.BikeTypes");
            DropTable("dbo.BikeModels");
        }
    }
}
