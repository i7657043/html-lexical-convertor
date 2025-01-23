using LexicalClient.Converter;

internal class Program
{
    private static void Main(string[] args)
    {
        Convertor c = new Convertor();

        string json = c.GetJson();

        Console.WriteLine(json);
    }
}
