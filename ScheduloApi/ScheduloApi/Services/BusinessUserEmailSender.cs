using Microsoft.AspNetCore.Identity;
using ScheduloApi.Models;

namespace ScheduloApi.Services
{
    public class BusinessUserEmailSender : IEmailSender<BusinessUser>
    {
        public Task SendConfirmationLinkAsync(BusinessUser user, string email, string confirmationLink)
        {
            return Task.CompletedTask;
        }

        public Task SendPasswordResetCodeAsync(BusinessUser user, string email, string resetCode)
        {
            return Task.CompletedTask;
        }

        public Task SendPasswordResetLinkAsync(BusinessUser user, string email, string resetLink)
        {
            return Task.CompletedTask;
        }
    }
}
