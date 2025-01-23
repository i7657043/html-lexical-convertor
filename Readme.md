### Lexical-To-Html-Converter

- Make sure `node` is installed
- Go into `client` -> `LexicalClient` -> `convertor` dir
- Run `yarn` to install dependencies
- Go back up a few dirs to `client` and open `LexicalClient.sln`
- Modify the Html string in `Program.cs`
- Run

#### Example

- Calling .js function directly
  `node convert.js "<p>This is a <i>short</i> para</p>" "content"`

- Args
  - #1 htmlString
  - #2 root node name of JSON output

```
//Output of example above

{
  "content": {
    "root": {
      "children": [
        {
          "children": [
            {
              "detail": 0,
              "format": 0,
              "mode": "normal",
              "style": "",
              "text": "This is a ",
              "type": "text",
              "version": 1
            },
            {
              "detail": 0,
              "format": 2,
              "mode": "normal",
              "style": "",
              "text": "short",
              "type": "text",
              "version": 1
            },
            {
              "detail": 0,
              "format": 0,
              "mode": "normal",
              "style": "",
              "text": " para",
              "type": "text",
              "version": 1
            }
          ],
          "direction": null,
          "format": "",
          "indent": 0,
          "type": "paragraph",
          "version": 1,
          "textFormat": 0,
          "textStyle": ""
        }
      ],
      "direction": null,
      "format": "",
      "indent": 0,
      "type": "root",
      "version": 1
    }
  }
}
```
