using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VSLab.Data;

namespace VSLab.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatMessageController : ControllerBase
{
    private readonly ChessDbContext _context;

    public ChatMessageController(ChessDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<ActionResult<List<tblChatMessage>>> GetMessages()
    {
        var messages = await _context.tblChatMessages.ToListAsync();
        return messages;
    }
    
    [HttpPost]
    public async Task<ActionResult<tblChatMessage>> PostMessage(tblChatMessage message)
    {
        _context.tblChatMessages.Add(message);
        await _context.SaveChangesAsync();
        return message;
    }
}