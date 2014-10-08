using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BikeFit2.Models.Aerobar
{
    public class BaseBarWidth
    {
        public BaseBarWidth()
        {
            BaseBarWidthID = new Guid();
        }
        [Key]
        public Guid BaseBarWidthID { get; set; }

        public double Width { get; set; }

        [ForeignKey("AerobarModel")]
        public Guid AerobarID { get; set; }

        public virtual AerobarModel AerobarModel { get; set; }
    }
}