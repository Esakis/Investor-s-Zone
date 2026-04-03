using InvestorZone.API.Models;

namespace InvestorZone.API.Services;

public interface IAccountService
{
    void RegisterUser(RegisterUserDto dto);
    string GenerateJwt(LoginDto dto);
}
