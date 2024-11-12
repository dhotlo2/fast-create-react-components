# Fast Create React Components

Fast Create React Components is a Visual Studio Code extension designed to streamline the process of creating React+TS components. With a single line of code, you can import a component, and if it doesn’t already exist, this extension will prompt you to create it automatically—saving time and minimizing interruptions in your workflow.

## Features

	•	Auto-Create React Components: Simply type an import statement (e.g., import Something from "./Something";), and if the file doesn’t exist, a prompt will appear to create the component at the specified path.
	•	Customizable Popup: A lightweight popup next to the import line provides options to:
	•	Create the component with Cmd+Enter (macOS) or Ctrl+Enter (Windows/Linux).
	•	Cancel the prompt with Cmd+Esc (macOS) or Ctrl+Esc (Windows/Linux).
	•	Automatic Component Structure: When creating a component, the extension generates a basic React component file with the component name, skeleton code, and a functional component structure using TypeScript (.tsx).
    •	Auto creates the folder if it doesn't exist as well.

## Screenshots

Here’s a preview of the extension in action:

![Popup Example](https://raw.githubusercontent.com/dhotlo2/fast-create-react-components/master/images/screenshot.png)

## Requirements

	•	Node.js: Node.js 18 or later is required for installation, as this extension relies on features in modern versions of Node.
	•	Visual Studio Code: Version 1.60.0 or later is recommended.

## Extension Settings

	1.	In any .tsx file, type an import statement for a component that doesn’t exist yet, such as:

    import MyNewComponent from "./MyNewComponent";

    2.	Press Cmd+Enter (macOS) or Ctrl+Enter (Windows/Linux) to create the component. A new file named MyNewComponent.tsx will be created in the specified directory with a basic component structure.
    
	3.	To cancel the creation prompt, press Cmd+Esc (macOS) or Ctrl+Esc (Windows/Linux).

## Known Issues

	•	The extension does not yet support customizing the component template beyond the default React Functional Component structure.
	•	If the import path includes a deeply nested directory that doesn’t exist, the extension will create the required folders, but errors may occur if permissions are restricted.

## Release Notes

Users appreciate release notes as you update your extension.

### Versions

1.0.0

	•	Initial release of Fast Create React Components with core functionality for auto-creating missing React components.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
