using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace ScheduloApi.Models
{
    public class BusinessUser : IdentityUser<Guid>
    {
        public const string RoleName = "BusinessUser";
    }

    public record struct BusinessUserRegisterDto(string UserName, string Email, string Password);

    public record struct BusinessUserLoginDto(string Email, string Password);

    public record struct BusinessUserLoginRefreshDto(string RefreshToken);

    public class AuthorizeBusinessUserAttribute : AuthorizeAttribute
    {
        public AuthorizeBusinessUserAttribute()
        {
            Roles = BusinessUser.RoleName;
        }
    }

    public static class BusinessUserExtensions
    {
        public static async Task EnsureBusinessUserRole(this IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
            var role = await roleManager.FindByNameAsync(BusinessUser.RoleName);
            if (role == null)
            {
                await roleManager.CreateAsync(new IdentityRole<Guid>(BusinessUser.RoleName));
            }
        }
    }
}
