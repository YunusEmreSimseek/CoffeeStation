using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder
    .Services.AddAuthentication()
    .AddJwtBearer(
        "OcelotAuthenticationScheme",
        opt =>
        {
            opt.Authority = builder.Configuration["IdentityServerUrl"];
            opt.Audience = "ResourceOcelot";
            opt.RequireHttpsMetadata = false;
        }
    );

// CORS ayarlarını ekleyin
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

IConfiguration configuration = new ConfigurationBuilder().AddJsonFile("ocelot.json").Build();
builder.Services.AddOcelot(configuration);
builder.Services.AddControllers();

var app = builder.Build();
await app.UseOcelot();

app.MapGet("/", () => "Hello World!");

app.MapControllers();
app.UseCors("AllowAllOrigins");
app.UseAuthentication();
app.UseAuthorization();


app.Run();

