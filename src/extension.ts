import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// Declare global variables to store the current component path and editor
let currentComponentPath: string | null = null;
let currentEditor: vscode.TextEditor | null = null;

export function activate(context: vscode.ExtensionContext) {
  const greenHighlight = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(140, 220, 140, 0.3)'
  });

  const inlineDecoration = vscode.window.createTextEditorDecorationType({
    after: {
      margin: '0 0 0 1em',
      color: 'rgba(140, 220, 140, 1)',
      contentText: '[Create component] (Cmd+Enter) | [Cancel] (Cmd+C)',
      fontWeight: 'bold',
    }
  });

  // Command to create the component
  let createComponentDisposable = vscode.commands.registerCommand('extension.createComponent', () => {
    if (currentComponentPath && currentEditor) {
      const componentFilePath = currentComponentPath;

      if (!fs.existsSync(componentFilePath)) {
        const componentName = path.basename(componentFilePath, '.tsx');
        const componentDir = path.dirname(componentFilePath);

        if (!fs.existsSync(componentDir)) fs.mkdirSync(componentDir, { recursive: true });

        const componentContent = `
import React from 'react';

const ${componentName}: React.FC = () => {
  return <div>${componentName}</div>;
};

export default ${componentName};
        `;

        fs.writeFileSync(componentFilePath, componentContent);

        setTimeout(() => {
          vscode.workspace.openTextDocument(componentFilePath).then(doc => {
            vscode.window.showTextDocument(doc);
          });
        }, 200);

        // Clear both inline and green highlight decorations after creation
        clearDecorations(greenHighlight, inlineDecoration);
        currentComponentPath = null;
      }
    }
  });

  // Command to cancel component creation
  let cancelCreateComponentDisposable = vscode.commands.registerCommand('extension.cancelCreateComponent', () => {
    clearDecorations(greenHighlight, inlineDecoration);
  });

  // Listen for selection changes to detect the Escape key press
  vscode.window.onDidChangeTextEditorSelection(event => {
    if (event.kind === vscode.TextEditorSelectionChangeKind.Command) {
      const editor = vscode.window.activeTextEditor;
      if (editor && editor === currentEditor && currentComponentPath) {
        clearDecorations(greenHighlight, inlineDecoration);
      }
    }
  });

  // Listen to document changes to trigger the check for component import statements
  vscode.workspace.onDidChangeTextDocument(event => {
    const { document, contentChanges } = event;
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    for (const change of contentChanges) {
      const line = change.range.start.line;
      checkForComponentImport(document, line, editor, greenHighlight, inlineDecoration);
    }
  });

  context.subscriptions.push(createComponentDisposable, cancelCreateComponentDisposable);
}

// Function to clear decorations and reset global variables
function clearDecorations(greenHighlight: vscode.TextEditorDecorationType, inlineDecoration: vscode.TextEditorDecorationType) {
  if (currentEditor) {
    currentEditor.setDecorations(greenHighlight, []);
    currentEditor.setDecorations(inlineDecoration, []);
    currentComponentPath = null;
  }
}

function checkForComponentImport(
  document: vscode.TextDocument,
  line: number,
  editor: vscode.TextEditor,
  greenHighlight: vscode.TextEditorDecorationType,
  inlineDecoration: vscode.TextEditorDecorationType
) {
  const text = document.lineAt(line).text;
  console.log("Processing line:", text);

  // Regular expression to match a complete import statement with relative path and .tsx or .js extension
  const regex = /import\s+(?:\{?\s*(\w+)\s*\}?)?\s+from\s+['"](.[./]+)(\w+)(\.tsx|\.js)?['"];\s*$/;
  const match = regex.exec(text);

  if (match) {
    console.log("Match found:", match);
    const componentName = match[1];
    const relativePath = match[2] + match[3] + (match[4] || ".tsx");

    const currentFileDir = path.dirname(document.uri.fsPath);
    const componentFilePath = path.resolve(currentFileDir, relativePath);
    console.log("Resolved component file path:", componentFilePath);

    // Only apply both decorations if the file doesn't exist
    if (!fs.existsSync(componentFilePath)) {
      const range = new vscode.Range(line, 0, line, text.length);
      editor.setDecorations(greenHighlight, [range]);
      editor.setDecorations(inlineDecoration, [range]);

      // Set the current component path and editor for use in commands
      currentComponentPath = componentFilePath;
      currentEditor = editor;
    } else {
      // Clear decorations if the file exists
      clearDecorations(greenHighlight, inlineDecoration);
    }
  } else {
    // Clear decorations if the line no longer matches an import statement
    clearDecorations(greenHighlight, inlineDecoration);
  }
}

export function deactivate() {}