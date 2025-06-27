using System.Text;
using Microsoft.Extensions.Logging;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.OpenAI;
using Microsoft.AspNetCore.Http;
using LiquorApp.Server.Models;

namespace LiquorApp.Server.Services;

public class OpenAIBottleRecognitionService : IBottleRecognitionService
{
    private readonly ILogger<OpenAIBottleRecognitionService> _logger;
    private readonly Kernel _kernel;
    private readonly string _apiKey;
    private const string ModelName = "gpt-4o"; // Use the latest model that supports both vision and JSON output

    public OpenAIBottleRecognitionService(IConfiguration configuration, ILogger<OpenAIBottleRecognitionService> logger)
    {
        _logger = logger;
        _apiKey = configuration["OpenAI:ApiKey"] ?? throw new ArgumentNullException("OpenAI:ApiKey is not configured");
        
        var builder = Kernel.CreateBuilder();
        builder.AddOpenAIChatCompletion(
            modelId: ModelName,
            apiKey: _apiKey);
            
        _kernel = builder.Build();
    }

    public async Task<BottleRecognitionResult> RecognizeBottleAsync(IFormFile image)
    {
        try
        {
            _logger.LogInformation("Starting bottle recognition with OpenAI");
            
            // Convert image to a byte array
            using var memoryStream = new MemoryStream();
            await image.CopyToAsync(memoryStream);
            var imageBytes = memoryStream.ToArray();

            // Create chat service
            var chatService = _kernel.GetRequiredService<IChatCompletionService>();
            
            // Prepare the chat history
            var chatHistory = new ChatHistory("""
                You are an expert in alcoholic beverages, especially in recognizing different types of liquor bottles. 
                When analyzing an image of a liquor bottle, provide the following information in JSON format:
                - Brand: The brand and specific name of the liquor
                - Name: The brand and specific name of the liquor
                - Type: The type of alcohol (e.g., Scotch Whisky, Bourbon, Vodka, etc.)
                - Description: A brief description of the liquor's characteristics
                - AlcoholContent: The alcohol by volume (ABV) if visible
                - Origin: The country or region of origin if visible
                - Confidence: A confidence score between 0 and 1
                
                If you're not sure about any field, use null. Respond with valid JSON only.
                """);

            // Add the image to the chat
            chatHistory.AddUserMessage(new ChatMessageContentItemCollection
            {
                new TextContent("Analyze this liquor bottle and provide the requested information in JSON format:"),
                new ImageContent(new ReadOnlyMemory<byte>(imageBytes), image.ContentType)
            });

            // Get the response from OpenAI
            var executionSettings = new OpenAIPromptExecutionSettings
            {
                ResponseFormat = "json_object",
                MaxTokens = 500
            };

            var response = await chatService.GetChatMessageContentAsync(
                chatHistory,
                executionSettings,
                _kernel);

            // Parse the response
            var result = System.Text.Json.JsonSerializer.Deserialize<BottleRecognitionResult>(
                response.Content ?? "{}",
                new System.Text.Json.JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            // Set timestamp and ensure confidence is set
            result ??= new BottleRecognitionResult();
            result.Timestamp = DateTime.UtcNow;
            
            _logger.LogInformation("Successfully recognized bottle: {BottleName}", result.Name);
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error recognizing bottle with OpenAI");
            throw;
        }
    }
}
