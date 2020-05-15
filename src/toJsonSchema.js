const vscode = require('vscode');
const fs = require('fs').promises;
const path = require('path');
const stripJsonComments = require('strip-json-comments');
const toJsonSchema = require('to-json-schema');

module.exports = async (fileUri) => {
  try {
    const fileString = (await fs.readFile(fileUri.path)).toString();
    const json = JSON.parse(stripJsonComments(fileString));
    const newFile = fileUri.path.replace(path.extname(fileUri.path), '.schema.json');
    await fs.writeFile(newFile, JSON.stringify(toJsonSchema(json), null, 2));
    vscode.window.showInformationMessage(`Created file ${path.basename(newFile)}`);
  } catch (err) {
    vscode.window.showErrorMessage(`Invalid json file ${path.basename(fileUri.path)}`);
    return;
  }
};
