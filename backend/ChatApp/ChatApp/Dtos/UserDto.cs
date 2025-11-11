namespace ChatApp.Dtos
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Nickname { get; set; }
        public List<MessageDto> Messages { get; set; }
    }
}
