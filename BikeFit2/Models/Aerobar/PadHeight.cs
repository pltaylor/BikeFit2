using System;
using System.ComponentModel.DataAnnotations;

namespace BikeFit2.Models.Aerobar
{
    public class PadHeight
    {
        public PadHeight()
        {
            PadHeightID = new Guid();
        }
        [Key]
        public Guid PadHeightID { get; set; }

        public double Height { get; set; }
    }
}