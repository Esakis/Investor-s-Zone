using InvestorZone.Entities;
using InvestorZone.Exceptions;
using InvestorZone.Models;
using InvestorZone.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace InvestorZone.Controllers
{
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

        [HttpPut("{id}")]
        public ActionResult<LoginDto> UpdatePost(Forum post)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (var ctx = new UserDbContext())
            {
                var existingPost = ctx.Forum.Where(p => p.Id == post.Id)
                    .FirstOrDefault<Forum>();

                if (existingPost != null)
                {
                    existingPost.Id = post.Id;
                    existingPost.Post = post.Post;
                    existingPost.Title = existingPost.Title;
                    existingPost.UserId = existingPost.UserId;
                    ctx.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        [HttpGet("forum")]
        public ActionResult<IEnumerable<LoginDto>> GetAll()
        {
            var forum = _context.Forum.ToList();

            return Ok(forum);
        }



        [HttpGet("{id}")]

        public ActionResult<LoginDto> GetById([FromRoute] int id)
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
}
