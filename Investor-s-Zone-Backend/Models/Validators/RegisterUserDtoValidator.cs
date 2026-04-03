using FluentValidation;
using InvestorZone.API.Entities;

namespace InvestorZone.API.Models.Validators;

public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
{
    public RegisterUserDtoValidator(UserDbContext dbContext)
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required.")
            .EmailAddress()
            .WithMessage("Invalid email format.");

        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage("Password is required.")
            .MinimumLength(6)
            .WithMessage("Password must be at least 6 characters long.");

        RuleFor(x => x.ConfirmPassword)
            .NotEmpty()
            .WithMessage("Password confirmation is required.")
            .Equal(x => x.Password).WithMessage("Passwords must match.");

        RuleFor(x => x.Email)
            .Custom((value, context) =>
            {
                var emailInUse = dbContext.Users.Any(u => u.Email == value);
                if (emailInUse)
                {
                    context.AddFailure("Email", "That email is taken");
                }
            });
    }
}
