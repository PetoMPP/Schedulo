using Microsoft.AspNetCore.Authorization;
using ScheduloApi.Identity.Models;

namespace ScheduloApi.Identity.Attributes;

public class AuthorizeBusinessUserAttribute : AuthorizeAttribute
{
    public AuthorizeBusinessUserAttribute()
    {
        Roles = BusinessUser.RoleName;
    }
}