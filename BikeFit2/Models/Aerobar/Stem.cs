using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BikeFit2.Models.Aerobar
{
    public class Stem
    {
        public Stem()
        {
            StemID = new Guid();
        }

        [Key]
        public Guid StemID { get; set; }

        public double Length { get; set; }

        public double Angle { get; set; }

        public double ClampHeight { get; set; }

        [ForeignKey("AerobarModel")]
        public Guid AerobarID { get; set; }

        public virtual AerobarModel AerobarModel { get; set; }
    }
}