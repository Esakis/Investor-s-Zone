using InvestorZone.API.Entities;
using InvestorZone.API.Exceptions;
using InvestorZone.API.Models;
using InvestorZone.API.Models.Validators;
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

    [HttpGet("exchange/{email}")]
    public ActionResult<BalanceDto> GetExchangeBalance([FromRoute] string email)
    {
        var user = _context
            .Users
            .FirstOrDefault(r => r.Email == email);

        if (user == null)
            return NotFound();

        // Create simple DTO with only balance data
        var balance = new BalanceDto
        {
            PLN = user.PLN,
            EUR = user.EUR,
            USD = user.USD,
            CHF = user.CHF,
            GBP = user.GBP,
            AUD = user.AUD,
            BGN = user.BGN,
            CAD = user.CAD,
            CZK = user.CZK,
            DKK = user.DKK,
            HDK = user.HDK,
            HRK = user.HRK,
            MXN = user.MXN,
            NOK = user.NOK,
            NZD = user.NZD,
            RON = user.RON,
            RUB = user.RUB,
            SEK = user.SEK,
            SGD = user.SGD,
            TRY = user.TRY,
            ZAR = user.ZAR
        };

        // Debug logging
        Console.WriteLine($"Balance DTO: PLN={balance.PLN}, EUR={balance.EUR}, USD={balance.USD}");

        return Ok(balance);
    }

    [HttpPut("exchange/{email}")]
    public ActionResult<LoginDto> UpdateExchange(User data)
    {
        if (!ModelState.IsValid)
            return BadRequest("Not a valid model");

        // Debug logging
        Console.WriteLine($"Received exchange data: PLN={data.PLN}, EUR={data.EUR}, USD={data.USD}");

        var existingUser = _context.Users.Where(p => p.Email == data.Email)
            .FirstOrDefault<User>();

        if (existingUser != null)
        {
            existingUser.Email = data.Email;
            existingUser.PasswordHash = existingUser.PasswordHash;

            // Subtract PLN
            existingUser.PLN = existingUser.PLN - data.PLN;

            // Add currency amounts dynamically
            existingUser.EUR = existingUser.EUR + data.EUR;
            existingUser.USD = existingUser.USD + data.USD;
            existingUser.CHF = existingUser.CHF + data.CHF;
            existingUser.GBP = existingUser.GBP + data.GBP;
            existingUser.AUD = existingUser.AUD + data.AUD;
            existingUser.BGN = existingUser.BGN + data.BGN;
            existingUser.CAD = existingUser.CAD + data.CAD;
            existingUser.CZK = existingUser.CZK + data.CZK;
            existingUser.DKK = existingUser.DKK + data.DKK;
            existingUser.HDK = existingUser.HDK + data.HDK;
            existingUser.HRK = existingUser.HRK + data.HRK;
            existingUser.MXN = existingUser.MXN + data.MXN;
            existingUser.NOK = existingUser.NOK + data.NOK;
            existingUser.NZD = existingUser.NZD + data.NZD;
            existingUser.RON = existingUser.RON + data.RON;
            existingUser.RUB = existingUser.RUB + data.RUB;
            existingUser.SEK = existingUser.SEK + data.SEK;
            existingUser.SGD = existingUser.SGD + data.SGD;
            existingUser.TRY = existingUser.TRY + data.TRY;
            existingUser.ZAR = existingUser.ZAR + data.ZAR;

            // Debug after update
            Console.WriteLine($"After update - PLN={existingUser.PLN}, EUR={existingUser.EUR}, USD={existingUser.USD}");

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

            // Add PLN
            existingUser.PLN = existingUser.PLN + data.PLN;

            // Subtract currency amounts dynamically
            existingUser.EUR = existingUser.EUR - data.EUR;
            existingUser.USD = existingUser.USD - data.USD;
            existingUser.CHF = existingUser.CHF - data.CHF;
            existingUser.GBP = existingUser.GBP - data.GBP;
            existingUser.AUD = existingUser.AUD - data.AUD;
            existingUser.BGN = existingUser.BGN - data.BGN;
            existingUser.CAD = existingUser.CAD - data.CAD;
            existingUser.CZK = existingUser.CZK - data.CZK;
            existingUser.DKK = existingUser.DKK - data.DKK;
            existingUser.HDK = existingUser.HDK - data.HDK;
            existingUser.HRK = existingUser.HRK - data.HRK;
            existingUser.MXN = existingUser.MXN - data.MXN;
            existingUser.NOK = existingUser.NOK - data.NOK;
            existingUser.NZD = existingUser.NZD - data.NZD;
            existingUser.RON = existingUser.RON - data.RON;
            existingUser.RUB = existingUser.RUB - data.RUB;
            existingUser.SEK = existingUser.SEK - data.SEK;
            existingUser.SGD = existingUser.SGD - data.SGD;
            existingUser.TRY = existingUser.TRY - data.TRY;
            existingUser.ZAR = existingUser.ZAR - data.ZAR;

            _context.SaveChanges();
        }
        else
        {
            return NotFound();
        }

        return Ok();
    }
}
