using Linx.Dev.Gabriel.Enums;
using System.ComponentModel.DataAnnotations;

namespace Linx.Dev.Gabriel.Model
{
    public class City
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Esse campo é obrigatório!")]
        public int IBGE { get; set; }
        [Required(ErrorMessage = "Esse campo é obrigatório!")]
        public UF UF { get; set; }
        [Required(ErrorMessage = "Esse campo é obrigatório!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Esse campo é obrigatório!")]
        public double Latitude { get; set; }
        [Required(ErrorMessage = "Esse campo é obrigatório!")]
        public double Longitude { get; set; }
        [Required(ErrorMessage = "Esse campo é obrigatório!")]
        public string Region { get; set; }
    }
}
