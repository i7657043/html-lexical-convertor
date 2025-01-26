using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http.Headers;

public record ConvertRequest(string HtmlString, string FieldName);

namespace ConverterApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConvertController : ControllerBase
    {
        private readonly ILogger<ConvertController> _logger;
        private readonly HttpClient _client;

        public ConvertController(ILogger<ConvertController> logger, IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            _client = httpClientFactory.CreateClient("ConverterClient");
        }

        [HttpPost("")]
        public async Task<IActionResult> ConvertAsync([FromBody] ConvertRequest convertRequest)
        {
            _logger.LogInformation($"Request from IP: {HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString()}");

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "")
            {
                Content = new StringContent(System.Text.Json.JsonSerializer.Serialize(new
                {
                    htmlString = convertRequest.HtmlString,
                    fieldName = convertRequest.FieldName
                }))
            };
            request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            HttpResponseMessage response = await _client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                string responseData = await response.Content.ReadAsStringAsync();

                return Content(responseData, "application/json");
            }
            return response.StatusCode == HttpStatusCode.TooManyRequests
                ? StatusCode((int)response.StatusCode, "You have been rate limited. Please try again later")
                : StatusCode((int)response.StatusCode, "There was an error, please try again later");
        }
    }
}