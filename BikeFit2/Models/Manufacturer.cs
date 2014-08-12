using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BikeFit2.Models
{
    public class Manufacturer
    {
        private ICollection<BikeModel> _Models;

        public Manufacturer()
        {
            ManufacturerID = Guid.NewGuid();
            _Models = new List<BikeModel>();
        }

        [Key]
        public Guid ManufacturerID { get; set; }

        public string Name { get; set; }

        public bool IsActive { get; set; }

        public virtual ICollection<BikeModel> Models
        {
            get
            {
                return _Models;
            }
            set
            {
                _Models = value;
            }
        }
    }
}