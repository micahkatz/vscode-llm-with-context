# VS Code Extension - LLM Chat With Context

This is a VS-Code extension that provides a LLM chat interface with editor context.

## Features

### Knowledge of the Current File

![Chat View - Knowledge of the Current File](media/vscode-extension-file-context.gif)

### Uses Markdown to Render Complex LLM Responses

![Chat View - Uses Markdown to Render Complex LLM Responses](media/vscode-extension-css-file.gif)

### Responds to VSCode Global Theme Changes

![Chat View - Responds to VSCode Global Theme Changes](media/vscode-extension-change-themes.gif)

### Maintains Context Across Different Languages

![Chat View - Maintains Context Across Different Languages](media/vscode-extension-change-files.gif)

## Running Locally

1. Run `nvm use` or verify you are running **Node 20**
2. Run `npm install` in the root directory
3. Switch to the `/src/client` directory and make sure to be on **Node 20** here as well
4. Run `npm install` in the `/src/client` directory
5. Get an OpenAI API Key and put it in `src/server/secret.ts`

```js
export const OPENAI_API_KEY = '<your-key>';
```

5. Open in VS Code and in the debug menu, Choose `Run Web Extension`
