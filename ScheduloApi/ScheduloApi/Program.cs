using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ScheduloApi.Data;
using ScheduloApi.Models;
using ScheduloApi.Services;
namespace ScheduloApi
{
    public class Program
    {
        public static void Main(string[] args)
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
                .AddEntityFrameworkStores<ApiContext>();
            builder.Services.AddTransient<IEmailSender<BusinessUser>, BusinessUserEmailSender>();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddAutoMapper(c => c.AddProfile<AutoMapperProfile>());

            var app = builder.Build();

            app.MapIdentityApi<BusinessUser>();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
