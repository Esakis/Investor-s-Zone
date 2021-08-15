using InvestorZone.Entities;
using InvestorZone.Exceptions;
using InvestorZone.Models;
using InvestorZone.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvestorZone.Controllers
{

    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly IAccountService _accountService;
        private readonly UserDbContext _context;

        public AccountController(IAccountService accountService, UserDbContext context)
        {
            _accountService = accountService;
            _context = context;
        }


        [HttpPost("register")]
        public ActionResult RegisterUser([FromBody] RegisterUserDto dto)
        {
            _accountService.RegisterUser(dto);
            return Ok();
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginDto dto)
        {
            var user = _context.Users
                .Include(u => u.Role)
                .FirstOrDefault(u => u.Email == dto.Email);

            if (user is null)
            {
                throw new BadRequestException("Invalid username or password");
            }


            string token = _accountService.GenerateJwt(dto);

            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(user);

        }

        [HttpPost("logout")]
        public ActionResult Logout()
        {

            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "success"
            });
        }


        [HttpGet("users")]

        public ActionResult<IEnumerable<LoginDto>> GetAll()
        {
            var users = _context.Users.ToList();

            return Ok(users);
        }

        [HttpGet("{id}")]

        public ActionResult<LoginDto> GetById([FromRoute] int id)
        {
            var user = _context
                .Users
                .Include(r => r.Role)
                .FirstOrDefault(r => r.Id == id);

            return Ok(user);
        }


        [HttpDelete("{id}")]

        public void Delete(int id)
        {
            var user = _context
                .Users
                .FirstOrDefault(r => r.Id == id);

            if (user is null)
                throw new NotFoundException("User not found");

            _context.Users.Remove(user);
            _context.SaveChanges();

        }

    }
}
