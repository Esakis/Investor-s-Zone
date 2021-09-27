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

        [HttpGet("{email}")]

        public ActionResult<LoginDto> GetById([FromRoute] string email)
        {
            var user = _context
                .Users
                .Include(r => r.Role)
                .FirstOrDefault(r => r.Email == email);

            return Ok(user);
        }



        [HttpDelete("{email}")]

        public void Delete(string email)
        {
            var user = _context
                .Users
                .FirstOrDefault(r => r.Email == email);

            if (user is null)
                throw new NotFoundException("User not found");

            _context.Users.Remove(user);
            _context.SaveChanges();

        }

        [HttpPut("{email}")]
        public ActionResult<LoginDto> UpdateUser(User data)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (var ctx = new UserDbContext())
            {
                var existingUser = ctx.Users.Where(p => p.Email == data.Email)
                    .FirstOrDefault<User>();

                if (existingUser != null)
                {
                    existingUser.Email = data.Email;
                    existingUser.PasswordHash = existingUser.PasswordHash;
                    existingUser.Id = existingUser.Id;
                    existingUser.DateOfBirth = data.DateOfBirth;
                    if (data.FirstName != "")
                    {
                        existingUser.FirstName = data.FirstName;
                    }
                    if (data.LastName != "")
                    {
                        existingUser.LastName = data.LastName;
                    }

                    if (data.Nationality != "")
                    {
                        existingUser.Nationality = data.Nationality;
                    }
                    ctx.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        [HttpPut("topup/{email}")]
        public ActionResult<LoginDto> UpdateBalance(User data)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (var ctx = new UserDbContext())
            {
                var existingUser = ctx.Users.Where(p => p.Email == data.Email)
                    .FirstOrDefault<User>();

                if (existingUser != null)
                {
                    existingUser.Email = data.Email;
                    existingUser.PasswordHash = existingUser.PasswordHash;
                    existingUser.Id = existingUser.Id;
                    existingUser.PLN = existingUser.PLN + data.PLN;


                    ctx.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }


        [HttpGet("topup/{email}")]

        public ActionResult<LoginDto> GetByBalance([FromRoute] string email)
        {
            var user = _context
                .Users
                .FirstOrDefault(r => r.Email == email);

            return Ok(user);
        }


        [HttpPut("exchange/{email}")]
        public ActionResult<LoginDto> UpdateExchange(User data)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            using (var ctx = new UserDbContext())
            {
                var existingUser = ctx.Users.Where(p => p.Email == data.Email)
                    .FirstOrDefault<User>();

                if (existingUser != null)
                {
                    existingUser.Email = data.Email;
                    existingUser.PasswordHash = existingUser.PasswordHash;
                   // existingUser.Id = existingUser.Id;
                    
                    existingUser.PLN = existingUser.PLN - data.PLN;
                    
                    if (data.EUR == null)
                    {
                        existingUser.EUR = existingUser.EUR;
                    }
                    else
                    {
                        existingUser.EUR = existingUser.EUR + data.EUR;
                    }

                    ctx.SaveChanges();
                }

                else
                {
                    return NotFound();
                }
            }

            return Ok();
        }

    }
}
