using Microsoft.AspNetCore.Identity;

namespace ScheduloApi.Identity.Models
{
    public class BusinessUser : IdentityUser<Guid>
    {
        public const string RoleName = "BusinessUser";
    }

    public record struct BusinessUserDto(Guid Id, string Username, string Email, string PhoneNumber);

    public record struct BusinessUserRegisterDto(string UserName, string Email, string Password);

    public record struct BusinessUserLoginDto(string Email, string Password);

    public record struct BusinessUserLoginRefreshDto(string RefreshToken);
}
