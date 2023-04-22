using oicar_ApiServices.Exstensions;
using Google.Apis.Auth;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.Cookies;
using FitPal_Models.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Configuration sql
builder.Services.ConfigureSqlContext(builder.Configuration);

// Add services to the container.
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        options.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.None;
    });
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.RegisterServices();
builder.Services.AddConfiguration(builder.Configuration);

var configuration = builder.Configuration;

//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
//})
//    .AddCookie()
//    .AddGoogle(options =>
//    {
//        // SocialLoginConfiguration
//        SocialLoginConfiguration socialLoginConfiguration = new SocialLoginConfiguration();
//        builder.Configuration.GetSection("Configuration:SocialLoginConfiguration").Bind(socialLoginConfiguration);

//        options.ClientId = socialLoginConfiguration.GoogleConfiguration.GoogleClientId;
//        options.ClientSecret = socialLoginConfiguration.GoogleConfiguration.ClientSecret;
//    });

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder
             .AllowAnyOrigin()
             .AllowAnyMethod()
             .AllowAnyHeader());

//app.UseAuthorization();
//app.UseAuthentication();


app.MapControllers();

app.Run();
