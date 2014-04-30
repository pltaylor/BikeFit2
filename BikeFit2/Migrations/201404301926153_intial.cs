namespace BikeFit2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class intial : DbMigration
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
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.BikeSizes", "BikeModelID", "dbo.BikeModels");
            DropForeignKey("dbo.BikeModels", "ManufactuerID", "dbo.Manufacturers");
            DropForeignKey("dbo.BikeModels", "BikeTypeId", "dbo.BikeTypes");
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.BikeSizes", new[] { "BikeModelID" });
            DropIndex("dbo.BikeModels", new[] { "BikeTypeId" });
            DropIndex("dbo.BikeModels", new[] { "ManufactuerID" });
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.BikeSizes");
            DropTable("dbo.Manufacturers");
            DropTable("dbo.BikeTypes");
            DropTable("dbo.BikeModels");
        }
    }
}
