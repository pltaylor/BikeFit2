using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BikeFit2.Models.Aerobar
{
    public class AerobarHeight
    {
        public AerobarHeight()
        {
            AerobarHeightID = new Guid();
        }

        [Key]
        public Guid AerobarHeightID { get; set; }

        public double Height { get; set; }

        [ForeignKey("AerobarModel")]
        public Guid AerobarID { get; set; }

        public virtual AerobarModel AerobarModel { get; set; }
    }
}