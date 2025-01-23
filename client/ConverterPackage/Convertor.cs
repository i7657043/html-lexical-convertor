using Newtonsoft.Json.Linq;
using System.Diagnostics;
using System.Reflection;
using System.Text.Json;

namespace LexicalClient.Converter
{
    public class Convertor()
    {
        public string GetJson()
        {
            string scriptPath = @"convertor\convert.js";
            string htmlString = "<p>This is a <i>short</i> para</p>";
            string fieldName = "content";

            Process process = new Process();
            process.StartInfo.FileName = "node";
            process.StartInfo.Arguments = $"{scriptPath} \"{htmlString}\" {fieldName}";
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.RedirectStandardError = true;
            process.StartInfo.CreateNoWindow = true;

            process.Start();

            string output = process.StandardOutput.ReadToEnd();
            string error = process.StandardError.ReadToEnd();

            process.WaitForExit();

            if (!string.IsNullOrEmpty(error))
            {
                Console.WriteLine("Error: " + error);
                Environment.Exit(0);
            }

            Root root = JsonSerializer.Deserialize<Root>(output, new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase })!;

            JObject jsonObj = JObject.Parse(output);

            return jsonObj.ToString();
        }
    }
}