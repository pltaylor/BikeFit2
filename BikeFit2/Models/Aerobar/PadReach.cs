using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BikeFit2.Models.Aerobar
{
    public class PadReach
    {
        public PadReach()
        {
            PadReachID = new Guid();
        }

        [Key]
        public Guid PadReachID { get; set; }

        public double Reach { get; set; }

        [ForeignKey("AerobarModel")]
        public Guid AerobarID { get; set; }

        public virtual AerobarModel AerobarModel { get; set; }
    }
}