
using LiquorApp.Server.Controllers;
using LiquorApp.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;

namespace LiquorApp.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers()
                .AddApplicationPart(typeof(BottleRecognitionController).Assembly);
                
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            
            // Register the bottle recognition service
            builder.Services.AddScoped<IBottleRecognitionService, OpenAIBottleRecognitionService>();
            
            // Log registered services for debugging
            if (builder.Environment.IsDevelopment())
            {
                builder.Services.AddLogging(logging => 
                {
                    logging.AddConsole();
                    logging.AddDebug();
                    logging.SetMinimumLevel(LogLevel.Debug);
                });
                
                builder.Services.AddSingleton<ILogger>(provider => 
                    provider.GetRequiredService<ILogger<Program>>());
            }

            // Add CORS policy
            var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() 
                ?? new[] { "https://localhost:5173", "http://localhost:5173", "https://localhost:7032", "http://localhost:7032" };
                
            // Enable CORS with a named policy
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    if (builder.Environment.IsDevelopment())
                    {
                        // Allow specific origins for development and allow credentials
                        policy.WithOrigins(allowedOrigins)
                               .AllowAnyMethod()
                               .AllowAnyHeader()
                               .AllowCredentials();
                    }
                    else
                    {
                        policy.WithOrigins(allowedOrigins)
                               .AllowAnyMethod()
                               .AllowAnyHeader()
                               .AllowCredentials();
                    }
                });
            });

            // Configure file upload limits
            builder.Services.Configure<FormOptions>(options =>
            {
                // Set the limit to 10MB
                options.MultipartBodyLengthLimit = 10 * 1024 * 1024;
            });

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                
                // Add request logging for debugging
                app.Use(async (context, next) =>
                {
                    Console.WriteLine($"Request: {context.Request.Method} {context.Request.Path}");
                    Console.WriteLine("Headers:");
                    foreach (var header in context.Request.Headers)
                    {
                        Console.WriteLine($"  {header.Key}: {header.Value}");
                    }
                    await next();
                });
            }

            app.UseHttpsRedirection();
            app.UseRouting();

            // Enable CORS (must be after UseRouting and before UseAuthorization)
            app.UseCors();
            
            // Add authorization and other middleware
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.MapFallbackToFile("/index.html");

            // Log all registered endpoints
            if (app.Environment.IsDevelopment())
            {
                app.Logger.LogInformation("Registered endpoints:");
                foreach (var endpoint in app.Services.GetRequiredService<IEnumerable<EndpointDataSource>>()
                    .SelectMany(es => es.Endpoints))
                {
                    app.Logger.LogInformation($"- {endpoint.DisplayName}");
                }
            }

            app.Run();
        }
    }
}
