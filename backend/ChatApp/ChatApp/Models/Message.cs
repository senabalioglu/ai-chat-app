using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatApp.Models
{
    public class Message
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Text { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Sentiment { get; set; } = string.Empty;

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreationDate { get; set; } = DateTime.Now;

        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
