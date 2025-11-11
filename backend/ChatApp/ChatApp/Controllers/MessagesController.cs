using ChatApp.Data;
using ChatApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public MessagesController( AppDbContext context )
        {
            _context = context; 
        }

        [HttpGet]
        public IActionResult GetAll() 
        {
            var messages = _context.Messages.ToList();
            return Ok(messages);
        }

        [HttpPost("Send")]
        public IActionResult SendMessage() 
        {
            var message = new Message()
            {
                Text = "Message tests",
                Sentiment = "negative"
            };

            _context.Messages.Add(message);
            _context.SaveChanges();
            return Ok(message);
        }
    }
}
