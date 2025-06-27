namespace LiquorApp.Server.Models;

public class BottleRecognitionResult
{
    public string? Brand { get; set; }
    public string? Name { get; set; }
    public string? Type { get; set; }
    public string? Description { get; set; }
    public string? AlcoholContent { get; set; }
    public string? Origin { get; set; }
    public double Confidence { get; set; }
    public DateTime Timestamp { get; set; }
}
