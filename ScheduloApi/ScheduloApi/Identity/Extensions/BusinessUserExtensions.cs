using Microsoft.AspNetCore.Identity;
using ScheduloApi.Identity.Models;

namespace ScheduloApi.Identity.Extensions;

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