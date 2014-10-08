using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BikeFit2.Models.Aerobar
{
    public class AerobarManufacturer
    {
        private ICollection<AerobarModel> _AerobarModels;

        public AerobarManufacturer()
        {
            ManufacturerID = Guid.NewGuid();
            _AerobarModels = new List<AerobarModel>();
        }

        [Key]
        public Guid ManufacturerID { get; set; }

        public string Name { get; set; }

        public bool IsActive { get; set; }

        public virtual ICollection<AerobarModel> AerobarModels
        {
            get
            {
                return _AerobarModels;
            }
            set
            {
                _AerobarModels = value;
            }
        }
    }
}