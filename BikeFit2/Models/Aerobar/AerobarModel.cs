using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BikeFit2.Models.Aerobar
{
    public class AerobarModel
    {
        public AerobarModel()
        {
            AerobarID = Guid.NewGuid();
        }

        [Key]
        public Guid AerobarID { get; set; }

        [ForeignKey("AerobarManufacturer")]
        public Guid AerobarManufacturerID { get; set; }

        public virtual AerobarManufacturer AerobarManufacturer { get; set; }

        [ForeignKey("BaseBarWidth")]
        public Guid BaseBarWidthID { get; set; }

        public virtual BaseBarWidth BaseBarWidth { get; set; }

        public AeroBarType AeroBarType { get; set; }

        [ForeignKey("PadWidth")]
        public Guid PadWidthID { get; set; }

        public virtual PadWidth PadWidth { get; set; }

        [ForeignKey("PadHeight")]
        public Guid PadHeightID { get; set; }

        public virtual PadHeight PadHeight { get; set; }

        [ForeignKey("PadReach")]
        public Guid PadReachtID { get; set; }

        public virtual PadReach PadReach { get; set; }

        [ForeignKey("AerobarHeight")]
        public Guid AerobarHeightID { get; set; }

        public virtual AerobarHeight AerobarHeight { get; set; }

        [ForeignKey("Stem")]
        public Guid StemID { get; set; }

        public virtual Stem Stem { get; set; }
    }
}