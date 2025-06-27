using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using LiquorApp.Server.Services;
using LiquorApp.Server.Models;

namespace LiquorApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class BottleRecognitionController : ControllerBase
{
    private readonly ILogger<BottleRecognitionController> _logger;
    private readonly IBottleRecognitionService _bottleRecognitionService;

    public BottleRecognitionController(
        ILogger<BottleRecognitionController> logger,
        IBottleRecognitionService bottleRecognitionService)
    {
        _logger = logger;
        _bottleRecognitionService = bottleRecognitionService;
        
        _logger.LogInformation($"{nameof(BottleRecognitionController)} initialized");
        _logger.LogInformation($"Route: {nameof(RecognizeBottle)} - POST /api/bottlerecognition/recognize");
    }

    [HttpPost("recognize")]
    [RequestSizeLimit(10 * 1024 * 1024)] // 10MB limit
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(object))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(object))]
    public async Task<IActionResult> RecognizeBottle([FromForm] IFormFile image)
    {
        try
        {
            _logger.LogInformation("Received bottle recognition request");

            if (image == null || image.Length == 0)
            {
                _logger.LogWarning("No image file provided in the request");
                return BadRequest(new { message = "No image file provided" });
            }

            // Validate file type
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp" };
            var extension = Path.GetExtension(image.FileName).ToLowerInvariant();
            if (string.IsNullOrEmpty(extension) || !allowedExtensions.Contains(extension))
            {
                _logger.LogWarning($"Invalid file type: {extension}");
                return BadRequest(new { message = "Invalid file type. Please upload an image file (JPG, PNG, GIF, BMP)." });
            }

            // Validate file size (10MB max)
            if (image.Length > 10 * 1024 * 1024)
            {
                _logger.LogWarning($"File too large: {image.Length} bytes");
                return BadRequest(new { message = "File is too large. Maximum size is 10MB." });
            }

            _logger.LogInformation("Starting bottle recognition...");
            
            // Process the image using the recognition service
            var result = await _bottleRecognitionService.RecognizeBottleAsync(image);
            
            if (result == null)
            {
                _logger.LogWarning("Recognition service returned null result");
                return StatusCode(500, new { message = "Failed to process the image. Please try again." });
            }
            
            _logger.LogInformation("Bottle recognition completed successfully");
            return Ok(new
            {
                success = true,
                data = new {
                    name = result.Name,
                    type = result.Type,
                    description = result.Description,
                    alcoholContent = result.AlcoholContent,
                    origin = result.Origin,
                    confidence = result.Confidence,
                    timestamp = result.Timestamp
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error recognizing bottle");
            return StatusCode(500, new { 
                success = false, 
                message = "An error occurred while processing the image",
                error = ex.Message
            });
        }
    }
}
