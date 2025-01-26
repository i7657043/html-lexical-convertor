var builder = WebApplication.CreateBuilder(args);

string baseAddress = builder.Configuration["ConvertorBaseUrl"];

builder.Services.AddHttpClient("ConverterClient", client =>
{
    client.BaseAddress = new Uri(baseAddress);
});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
