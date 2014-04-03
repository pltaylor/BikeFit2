using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BikeFit2.Models
{
    public class BikeModel
    {
        private ICollection<BikeSize> sizes;

        public BikeModel()
        {
            BikeModelID = Guid.NewGuid();
            sizes = new List<BikeSize>();
        }
        [Key]
        public Guid BikeModelID { get; set; }

        [ForeignKey("Manufacturer")]
        public Guid ManufactuerID { get; set; }

        public virtual Manufacturer Manufacturer { get; set; }


        [ForeignKey("BikeType")]
        public int BikeTypeId { get; set; }

        public virtual BikeType BikeType { get; set; }

        public string Name { get; set; }

        [Column(TypeName = "Date")]
        public DateTime ManufacturedStartDate { get; set; }

        [Column(TypeName = "Date")]
        public DateTime ManufacturedEndDate { get; set; }

        public virtual ICollection<BikeSize> Sizes
        {
            get
            {
                return sizes;
            }
            set
            {
                sizes = value;
            }
        }
    }
}