public class Root
{
    public Content Content { get; set; }
}

public class Content
{
    public ElementNode Root { get; set; }
}

public class ElementNode : Node
{
    public string Direction { get; set; }
    public int Indent { get; set; }
}

public class Node
{
    public List<Node> Children { get; set; } = new List<Node>();
    public string Type { get; set; }
    public int Version { get; set; }
}
