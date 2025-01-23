const { $generateNodesFromDOM } = require("@lexical/html");
const { $getRoot, createEditor, $getSelection } = require("lexical");
const { JSDOM } = require("jsdom");

function convertHtmlToLexical(htmlString, fieldName) {
  const editor = createEditor();

  editor.update(
    () => {
      const nodes = $generateNodesFromDOM(
        editor,
        new JSDOM(htmlString).window.document
      );

      $getRoot().select();

      const selection = $getSelection();

      selection.insertNodes(nodes);
    },
    { discrete: true }
  );

  const lexicalJson = editor.getEditorState().toJSON();

  const result = {
    [fieldName]: lexicalJson,
  };

  return result;
}

const args = process.argv.slice(2);
const htmlString = args[0];
const fieldName = args[1];

const lexicalJson = convertHtmlToLexical(htmlString, fieldName);

console.log(JSON.stringify(lexicalJson, null, 2));
