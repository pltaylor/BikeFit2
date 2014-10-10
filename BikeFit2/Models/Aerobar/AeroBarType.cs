using System.ComponentModel.DataAnnotations;

namespace BikeFit2.Models.Aerobar
{
    public class AeroBarType
    {
        [Key]
        public int AeroBarTypeId { get; set; }

        [Required]
        public string Type { get; set; }
    }
}