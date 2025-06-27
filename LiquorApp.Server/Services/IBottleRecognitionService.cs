using LiquorApp.Server.Models;
using Microsoft.AspNetCore.Http;

namespace LiquorApp.Server.Services;

public interface IBottleRecognitionService
{
    Task<BottleRecognitionResult> RecognizeBottleAsync(IFormFile image);
}
