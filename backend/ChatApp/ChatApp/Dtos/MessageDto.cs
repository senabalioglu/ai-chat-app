namespace ChatApp.Dtos
{
    public class MessageDto
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public string Sentiment { get; set; }
        public DateTime CreationDate { get; set; }

        public Guid UserId { get; set; }
    }
}