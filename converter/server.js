"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const html_1 = require("@lexical/html");
const lexical_1 = require("lexical");
const jsdom_1 = require("jsdom");
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    var json = convertHtmlToLexical("<p>this is a <b>short</b> para</p>", "content");
    res.json(json);
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
function convertHtmlToLexical(htmlString, fieldName) {
    const editor = (0, lexical_1.createEditor)();
    editor.update(() => {
        const nodes = (0, html_1.$generateNodesFromDOM)(editor, new jsdom_1.JSDOM(htmlString).window.document);
        (0, lexical_1.$getRoot)().select();
        const selection = (0, lexical_1.$getSelection)();
        selection === null || selection === void 0 ? void 0 : selection.insertNodes(nodes);
    }, { discrete: true });
    const lexicalJson = editor.getEditorState().toJSON();
    return {
        [fieldName]: lexicalJson,
    };
}
