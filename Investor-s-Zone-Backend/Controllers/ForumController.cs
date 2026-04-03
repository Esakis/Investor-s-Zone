using InvestorZone.API.Entities;
using InvestorZone.API.Exceptions;
using InvestorZone.API.Models;
using InvestorZone.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvestorZone.API.Controllers;

[Route("api/forum")]
[ApiController]
public class ForumController : ControllerBase
{
    private readonly IAccountService _accountService;
    private readonly UserDbContext _context;

    public ForumController(IAccountService accountService, UserDbContext context)
    {
        _accountService = accountService;
        _context = context;
    }

    [HttpPost("forum")]
    [AllowAnonymous]
    public ActionResult<Forum> CreatePost([FromBody] Forum post)
    {
        if (!ModelState.IsValid)
            return BadRequest("Not a valid model");

        _context.Forum.Add(post);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
    }

    [HttpPut("{id}")]
    public ActionResult<LoginDto> UpdatePost(Forum post)
    {
        if (!ModelState.IsValid)
            return BadRequest("Not a valid model");

        var existingPost = _context.Forum.Where(p => p.Id == post.Id)
            .FirstOrDefault<Forum>();

        if (existingPost != null)
        {
            existingPost.Id = post.Id;
            existingPost.Post = post.Post;
            existingPost.Title = existingPost.Title;
            existingPost.UserId = existingPost.UserId;
            _context.SaveChanges();
        }
        else
        {
            return NotFound();
        }

        return Ok();
    }

    [HttpGet("forum")]
    [AllowAnonymous]
    public ActionResult<IEnumerable<LoginDto>> GetAll()
    {
        var forum = _context.Forum.ToList();
        return Ok(forum);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public ActionResult<Forum> GetById([FromRoute] int id)
    {
        var forum = _context
            .Forum
            .FirstOrDefault(r => r.Id == id);

        return Ok(forum);
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        var forum = _context
            .Forum
            .FirstOrDefault(r => r.Id == id);

        if (forum is null)
            throw new NotFoundException("User not found");

        _context.Forum.Remove(forum);
        _context.SaveChanges();
    }
}
