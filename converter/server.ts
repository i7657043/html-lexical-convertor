import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, createEditor, $getSelection } from 'lexical';
import { JSDOM } from 'jsdom';

const app = express();
const port =  3000;

app.use(bodyParser.json());

app.post('/', (req: Request, res: Response) => {  
  var htmlString = req.body.htmlString;
  var fieldName = req.body.fieldName;

  var json = convertHtmlToLexical(htmlString, fieldName)

  res.json(json);
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

function convertHtmlToLexical(htmlString: string, fieldName: string): { [key: string]: any } {
  const editor = createEditor();

  editor.update(
    () => {
      const nodes = $generateNodesFromDOM(
        editor,
        new JSDOM(htmlString).window.document
      );

      $getRoot().select();
      const selection = $getSelection();
      selection?.insertNodes(nodes);
    },
    { discrete: true }
  );

  const lexicalJson = editor.getEditorState().toJSON();

  return {
    [fieldName]: lexicalJson,
  };
}