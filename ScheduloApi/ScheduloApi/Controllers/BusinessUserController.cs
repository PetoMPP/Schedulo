using AutoMapper;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ScheduloApi.Identity.Attributes;
using ScheduloApi.Identity.Models;
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

        [HttpGet]
        [AuthorizeBusinessUser]
        public async Task<IActionResult> GetBusinessUser()
        {
            return Ok(_mapper.Map<BusinessUserDto>(await _userManager.GetUserAsync(User)));
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] BusinessUserRegisterDto registerDto)
        {
            var businessUser = _mapper.Map<BusinessUser>(registerDto);
            var result = await _userManager.CreateAsync(businessUser, registerDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new ApiErrorResponse(result.Errors));
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
                return BadRequest(new ApiErrorResponse("UserNotFound", $"User with email '{loginDto.Email}' was not found."));
            }

            _signInManager.AuthenticationScheme = IdentityConstants.BearerScheme;

            var result = await _signInManager.PasswordSignInAsync(user, loginDto.Password, false, false);

            if (!result.Succeeded)
            {
                return Unauthorized(new ApiErrorResponse("InvalidPassword", "Provided password was invalid."));
            }

            return Empty;
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
                return Unauthorized(new ApiErrorResponse("TokenExpired", "Refresh token is expired."));
            }

            var newPrincipal = await _signInManager.CreateUserPrincipalAsync(user);

            return SignIn(newPrincipal);
        }
    }
}
