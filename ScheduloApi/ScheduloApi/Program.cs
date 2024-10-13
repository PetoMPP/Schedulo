using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ScheduloApi.Data;
using ScheduloApi.Identity;
using ScheduloApi.Identity.Extensions;
using ScheduloApi.Identity.Models;
using ScheduloApi.Services;

namespace ScheduloApi
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<ApiContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("ScheduloApiContext") ?? throw new InvalidOperationException("Connection string 'ScheduloApiContext' not found.")));

            builder.Services.AddAuthorization();
            builder.Services.AddIdentityApiEndpoints<BusinessUser>(c =>
                {
                    //c.SignIn.RequireConfirmedEmail = true;
                    c.User.RequireUniqueEmail = true;
                    c.Password.RequireNonAlphanumeric = false;
                })
                .AddRoles<IdentityRole<Guid>>()
                .AddUserManager<UserManager<BusinessUser>>()
                .AddRoleManager<RoleManager<IdentityRole<Guid>>>()
                .AddEntityFrameworkStores<ApiContext>();

            builder.Services.AddTransient<IEmailSender<BusinessUser>, BusinessUserEmailSender>();
            // Use only one IUserValidator<TUser>
            builder.Services.Replace(new ServiceDescriptor(
                typeof(IUserValidator<BusinessUser>),
                typeof(BusinessUserValidator),
                ServiceLifetime.Transient
            ));
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddAutoMapper(c => c.AddProfile<AutoMapperProfile>());

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<ApiContext>();
                await context.Database.MigrateAsync();
                await services.EnsureBusinessUserRole();
            }

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            await app.RunAsync();
        }
    }
}
