using ChatApp.Data;
using ChatApp.Dtos;
using ChatApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.Json;

namespace ChatApp.Services
{
    public class AnalyzeService
    {
        private readonly HttpClient _httpClient;
        private readonly AppDbContext _context;

        public AnalyzeService(HttpClient httpClient, AppDbContext context)
        {
            _httpClient = httpClient;
            _context = context;
        }

        public async Task<Message> AnalyzeSentimentAsync(Guid userId, string text)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
            {
                throw new ArgumentException($"User {userId} not found");
            }

            var payload = new { data = new[] { text } };
            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(
                "https://sihirlipaspas-sentiment-analysis.hf.space/api/predict/",
                content
            );

            response.EnsureSuccessStatusCode();
            var resultJson = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(resultJson);
            var data = doc.RootElement.GetProperty("data")[0];
            string label = data.GetProperty("label").GetString() ?? "UNKNOWN";

            var message = new Message
            {
                Text = text,
                Sentiment = label,
                UserId = userId
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return message;
        }

        public async Task<List<MessageDto>> GetMessagesForUserAsync(Guid userId)
        {
            return await _context.Messages
            .Where(m => m.UserId == userId)
            .Select(m => new MessageDto
            {
                Id = m.Id,
                Text = m.Text,
                Sentiment = m.Sentiment,
                CreationDate = m.CreationDate
            })
            .ToListAsync();

        }

        public async Task<IEnumerable<MessageDto>> GetAllMessagesAsync()
        {
            return await _context.Messages
            .Include(m => m.User)
            .Select(m => new MessageDto
            {
                Id = m.Id,
                Text = m.Text,
                Sentiment = m.Sentiment,
                CreationDate = m.CreationDate,
                UserId = m.UserId,
                Nickname = m.User.Nickname
            })
            .ToListAsync();

        }

    }
}
