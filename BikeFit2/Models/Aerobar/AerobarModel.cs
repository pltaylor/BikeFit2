using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BikeFit2.Models.Aerobar
{
    public class AerobarModel
    {
        private ICollection<BaseBarWidth> _BaseBarWidths;
        private ICollection<PadWidth> _PadWidths;
        private ICollection<PadHeight> _PadHeights;
        private ICollection<PadReach> _PadReaches;
        private ICollection<AerobarHeight> _AerobarHeights;
        private ICollection<Stem> _Stems;

        public AerobarModel()
        {
            AerobarID = Guid.NewGuid();
            _BaseBarWidths = new List<BaseBarWidth>();
            _PadWidths = new List<PadWidth>();
            _PadHeights = new List<PadHeight>();
            _PadReaches = new List<PadReach>();
            _AerobarHeights = new List<AerobarHeight>();
            _Stems = new List<Stem>();
        }

        [Key]
        public Guid AerobarID { get; set; }

        [ForeignKey("AerobarManufacturer")]
        public Guid AerobarManufacturerID { get; set; }

        public string ModelName { get; set; }

        public virtual AerobarManufacturer AerobarManufacturer { get; set; }

        public virtual ICollection<BaseBarWidth> BaseBarWidths
        {
            get
            {
                return _BaseBarWidths;
            }
            set
            {
                _BaseBarWidths = value;
            }
        }

        public AeroBarType AeroBarType { get; set; }

        public virtual ICollection<PadWidth> PadWidths
        {
            get
            {
                return _PadWidths;
            }
            set
            {
                _PadWidths = value;
            }
        }

        public virtual ICollection<PadHeight> PadHeights
        {
            get
            {
                return _PadHeights;
            }
            set
            {
                _PadHeights = value;
            }
        }

        public virtual ICollection<PadReach> PadReaches
        {
            get
            {
                return _PadReaches;
            }
            set
            {
                _PadReaches = value;
            }
        }

        public virtual ICollection<AerobarHeight> AerobarHeights
        {
            get
            {
                return _AerobarHeights;
            }
            set
            {
                _AerobarHeights = value;
            }
        }

        public virtual ICollection<Stem> Stems
        {
            get
            {
                return _Stems;
            }
            set
            {
                _Stems = value;
            }
        }
    }
}