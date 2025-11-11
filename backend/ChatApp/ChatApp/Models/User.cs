using System.ComponentModel.DataAnnotations;

namespace ChatApp.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(50)]
        public string Nickname { get; set; } = null!;
        public ICollection<Message> Messages { get; set; } = new List<Message>();
    }
}
