using ChatApp.Data;
using ChatApp.Dtos;
using ChatApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        public class CreateUserRequest
        {
            public string Nickname { get; set; } = null!;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] string nickname)
        {
            if (string.IsNullOrWhiteSpace(nickname))
            {
                return BadRequest("Nickname cannot be empty");
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Nickname == nickname);

            if (existingUser != null) 
            {
                return Ok(existingUser);
            }

            var newUser = new User
            {
                Id = Guid.NewGuid(),
                Nickname = nickname.Trim()
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(newUser);
        }

        /*
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Nickname))
            {
                return BadRequest("Nickname is required.");
            }

            var user = new User();

            var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Nickname == request.Nickname.Trim());

            if (existingUser == null)
            {
                user = new User
                {
                    Nickname = request.Nickname.Trim(),
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }
        */

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.Users
            .Include(u => u.Messages)
            .Select(u => new UserDto
            {
                Id = u.Id,
                Nickname = u.Nickname,
                Messages = u.Messages.Select(m => new MessageDto
                {
                    Id = m.Id,
                    Text = m.Text,
                    Sentiment = m.Sentiment
                }).ToList()
            }).ToListAsync();

            return Ok(users);
        }
    }
}
