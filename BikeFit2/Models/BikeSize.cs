using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BikeFit2.Models
{
    public class BikeSize
    {
        public BikeSize()
        {
            SizeID = Guid.NewGuid();
        }

        [Key]
        public Guid SizeID { get; set; }

        [ForeignKey("BikeModel")]
        public Guid BikeModelID { get; set; }

        public BikeModel BikeModel { get; set; }

        public int SortOrder { get; set; }

        public string Size { get; set; }

        public WheelSize WheelSize { get; set; } //

        public double HeadTubeAngle { get; set; }

        public double BottomBracketDrop { get; set; }

        public double HeadTubeLength { get; set; } //

        public double FrontCenter { get; set; } //

        public double RearCenter { get; set; }

        public double Stack { get; set; } //

        public double Reach { get; set; } //

        public double MaxSeatAngle { get; set; } //

        public double MinSeatAngle { get; set; } //
    }
}