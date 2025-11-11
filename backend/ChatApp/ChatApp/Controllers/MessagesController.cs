using Azure.Core;
using ChatApp.Data;
using ChatApp.Models;
using ChatApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        //private readonly AppDbContext _context;
        private readonly AnalyzeService _analyzeService;

        public MessagesController( AppDbContext context, AnalyzeService analyzeService )
        {
            //_context = context; 
            _analyzeService = analyzeService;
        }

        public class AnalyzeRequest
        {
            public Guid UserId { get; set; }
            public string Text { get; set; } = null!;
        }

        [HttpPost("analyze")]
        public async Task<IActionResult> Analyze([FromBody] AnalyzeRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Text))
            {
                return BadRequest("Text is required.");
            }

            var message = await _analyzeService.AnalyzeSentimentAsync(request.UserId, request.Text);
            return Ok(message);
        }

        [HttpGet("${userId}")]
        public async Task<IActionResult> GetForUser(Guid userId)
        {
            var messages = await _analyzeService.GetMessagesForUserAsync(userId);
            return Ok(messages);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllMessages()
        {
            var messages = await _analyzeService.GetAllMessagesAsync();
            return Ok(messages);
        }

    }
}
