using Microsoft.AspNetCore.Identity;
using ScheduloApi.Identity.Models;

namespace ScheduloApi.Identity
{
    public class BusinessUserValidator : UserValidator<BusinessUser>
    {
        public const int MinUserNameLength = 5;
        public const int MaxUserNameLength = 32;

        public override async Task<IdentityResult> ValidateAsync(UserManager<BusinessUser> manager, BusinessUser user)
        {
            var errors = (await base.ValidateAsync(manager, user)).Errors.ToList();
            // Add custom validation for UserName length, rest of properties are defined in IdentityOptions
            if (string.IsNullOrEmpty(user.UserName))
            {
                // Replace default error message
                errors.Find(e => e.Code == "InvalidUserName")!.Description = "Username cannot be empty.";
            }
            else if (user.UserName?.Length is < MinUserNameLength or > MaxUserNameLength)
            {
                errors.Add(new IdentityError
                {
                    Code = "UserName length",
                    Description = $"Username must be at least {MinUserNameLength} and up to {MaxUserNameLength} characters long."
                });
            }

            return errors.Count > 0 ? IdentityResult.Failed(errors.ToArray()) : IdentityResult.Success;
        }
    }
}
