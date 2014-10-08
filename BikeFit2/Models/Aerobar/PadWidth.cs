using System;
using System.ComponentModel.DataAnnotations;

namespace BikeFit2.Models.Aerobar
{
    public class PadWidth
    {
        public PadWidth()
        {
            PadWidthID = new Guid();
        }
        [Key]
        public Guid PadWidthID { get; set; }

        public double Width { get; set; }
    }
}