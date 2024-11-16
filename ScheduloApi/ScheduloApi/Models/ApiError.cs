using Microsoft.AspNetCore.Identity;

namespace ScheduloApi.Models
{
    public class ApiErrorResponse : List<ApiError>
    {
        public ApiErrorResponse()
        {
        }

        public ApiErrorResponse(IEnumerable<IdentityError> errors)
        {
            AddRange(errors.Select(e => new ApiError(e.Code, e.Description)));
        }


        public ApiErrorResponse(IEnumerable<ApiError> errors)
        {
            AddRange(errors);
        }

        public ApiErrorResponse(string code, string description)
        {
            Add(new ApiError(code, description));
        }
    }

    public class ApiError
    {
        public string Code { get; set; }
        public string Description { get; set; }

        public ApiError(string code, string description)
        {
            Code = code;
            Description = description;
        }
    }
}
