# VS Code Extension - LLM Chat With Context

This is a VS-Code extension that provides a LLM chat interface with editor context.

## Features

### Chat View

### Knowledge of the Current File

### Knowledge of the Current File's Language (Python, JS, or TypeScript)

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
