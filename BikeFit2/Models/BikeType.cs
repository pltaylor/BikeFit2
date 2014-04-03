using System.ComponentModel.DataAnnotations;

namespace BikeFit2.Models
{
    public class BikeType
    {
        [Key]
        public int BikeTypeId { get; set; }

        [Required]
        public string Type { get; set; }
    }
}