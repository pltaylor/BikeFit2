using System;
using System.ComponentModel.DataAnnotations;

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
    }
}