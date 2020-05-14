const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const stripJsonComments = require('strip-json-comments');
const toJsonSchema = require('to-json-schema');

module.exports = function(fileUri) {
  try {
    const json = JSON.parse(stripJsonComments(fs.readFileSync(fileUri.path).toString()));
    const newFile = fileUri.path.replace(path.extname(fileUri.path), '.schema.json');
    fs.writeFileSync(newFile, JSON.stringify(toJsonSchema(json), null, 2));
    vscode.window.showInformationMessage(`Created file ${path.basename(newFile)}`);
  } catch (err) {
    vscode.window.showErrorMessage(`Invalid json file ${path.basename(fileUri.path)}`);
    return;
  }
};
