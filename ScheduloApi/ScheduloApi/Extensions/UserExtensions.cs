using System.Security.Claims;

namespace ScheduloApi.Extensions
{
    public static class UserExtensions
    {
        public static Guid? GetUserId(this ClaimsPrincipal user)
        {
            if (user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value is { } id &&
                Guid.TryParse(id, out var guid))
            {
                return guid;
            }

            return null;
        }
    }
}
