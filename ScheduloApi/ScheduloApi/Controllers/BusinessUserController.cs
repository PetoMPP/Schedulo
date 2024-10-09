using AutoMapper;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ScheduloApi.Models;

namespace ScheduloApi.Controllers
{
    [Route("business-user")]
    [ApiController]
    public class BusinessUserController : ControllerBase
    {
        private readonly UserManager<BusinessUser> _userManager;
        private readonly SignInManager<BusinessUser> _signInManager;
        private readonly TimeProvider _timeProvider;
        private readonly IOptionsMonitor<BearerTokenOptions> _bearerTokenOptions;
        private readonly IMapper _mapper;

        public BusinessUserController(
            UserManager<BusinessUser> userManager,
            SignInManager<BusinessUser> signInManager,
            TimeProvider timeProvider,
            IOptionsMonitor<BearerTokenOptions> bearerTokenOptions,
            IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _timeProvider = timeProvider;
            _bearerTokenOptions = bearerTokenOptions;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] BusinessUserRegisterDto registerDto)
        {
            if (await _userManager.FindByEmailAsync(registerDto.Email) is not null || await _userManager.FindByNameAsync(registerDto.UserName) is not null)
            {
                return BadRequest(new { Error = "User already exists" });
            }

            var businessUser = _mapper.Map<BusinessUser>(registerDto);
            var result = await _userManager.CreateAsync(businessUser, registerDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _userManager.AddToRoleAsync(businessUser, BusinessUser.RoleName);

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] BusinessUserLoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user is null)
            {
                return BadRequest(new { Error = "User does not exist" });
            }

            _signInManager.AuthenticationScheme = IdentityConstants.BearerScheme;

            var result = await _signInManager.PasswordSignInAsync(user, loginDto.Password, false, false);

            if (!result.Succeeded)
            {
                return Unauthorized(new { Error = "Invalid password" });
            }

            return Ok();
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] BusinessUserLoginRefreshDto refreshDto)
        {
            var refreshTokenProtector = _bearerTokenOptions.Get(IdentityConstants.BearerScheme).RefreshTokenProtector;
            var refreshTicket = refreshTokenProtector.Unprotect(refreshDto.RefreshToken);

            // Reject the /refresh attempt with a 401 if the token expired or the security stamp validation fails
            if (refreshTicket?.Properties.ExpiresUtc is not { } expiresUtc ||
                _timeProvider.GetUtcNow() >= expiresUtc ||
                await _signInManager.ValidateSecurityStampAsync(refreshTicket.Principal) is not { } user)
            {
                return Unauthorized();
            }

            var newPrincipal = await _signInManager.CreateUserPrincipalAsync(user);

            return SignIn(newPrincipal);
        }
    }
}
