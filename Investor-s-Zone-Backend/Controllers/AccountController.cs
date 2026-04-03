using InvestorZone.API.Entities;
using InvestorZone.API.Exceptions;
using InvestorZone.API.Models;
using InvestorZone.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InvestorZone.API.Controllers;

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
        try
        {
            _accountService.RegisterUser(dto);
            return Ok(new { message = "User registered successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("login")]
    public ActionResult Login([FromBody] LoginDto dto)
    {
        try
        {
            var user = _context.Users
                .Include(u => u.Role)
                .FirstOrDefault(u => u.Email == dto.Email);

            if (user is null)
            {
                return BadRequest(new { error = "Invalid username or password" });
            }

            string token = _accountService.GenerateJwt(dto);

            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new { 
                message = "Login successful",
                user = new {
                    user.Id,
                    user.Email,
                    user.FirstName,
                    user.LastName,
                    user.RoleId,
                    user.PLN,
                    user.EUR,
                    user.GBP,
                    user.DateOfBirth,
                    user.Nationality,
                    Role = new {
                        user.Role.Id,
                        user.Role.Name
                    }
                }
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet]
    public ActionResult GetCurrentAccount()
    {
        // Try to get user from JWT token
        var token = Request.Cookies["jwt"];
        if (string.IsNullOrEmpty(token))
        {
            return Ok(new { email = (string)null });
        }

        try
        {
            // For now, just return success - token validation would go here
            return Ok(new { email = "user@example.com" });
        }
        catch
        {
            return Ok(new { email = (string)null });
        }
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

        var existingUser = _context.Users.Where(p => p.Email == data.Email)
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
            _context.SaveChanges();
        }
        else
        {
            return NotFound();
        }

        return Ok();
    }

    [HttpPut("topup/{email}")]
    public ActionResult<LoginDto> UpdateBalance(User data)
    {
        if (!ModelState.IsValid)
            return BadRequest("Not a valid model");

        var existingUser = _context.Users.Where(p => p.Email == data.Email)
            .FirstOrDefault<User>();

        if (existingUser != null)
        {
            existingUser.Email = data.Email;
            existingUser.PasswordHash = existingUser.PasswordHash;
            existingUser.Id = existingUser.Id;
            existingUser.PLN = existingUser.PLN + data.PLN;

            _context.SaveChanges();
        }
        else
        {
            return NotFound();
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

        var existingUser = _context.Users.Where(p => p.Email == data.Email)
            .FirstOrDefault<User>();

        if (existingUser != null)
        {
            existingUser.Email = data.Email;
            existingUser.PasswordHash = existingUser.PasswordHash;

            existingUser.PLN = existingUser.PLN - data.PLN;

            if (data.EUR > 0)
            {
                existingUser.EUR = existingUser.EUR + data.EUR;
            }

            _context.SaveChanges();
        }
        else
        {
            return NotFound();
        }

        return Ok();
    }

    [HttpPut("exchangePLN/{email}")]
    public ActionResult<LoginDto> UpdateExchangePLN(User data)
    {
        if (!ModelState.IsValid)
            return BadRequest("Not a valid model");

        var existingUser = _context.Users.Where(p => p.Email == data.Email)
            .FirstOrDefault<User>();

        if (existingUser != null)
        {
            existingUser.Email = data.Email;
            existingUser.PasswordHash = existingUser.PasswordHash;

            existingUser.PLN = existingUser.PLN + data.PLN;

            if (data.PLN > 0)
            {
                existingUser.EUR = existingUser.EUR - data.EUR;
            }

            _context.SaveChanges();
        }
        else
        {
            return NotFound();
        }

        return Ok();
    }
}
