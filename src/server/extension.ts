import * as vscode from 'vscode';

import { OPENAI_API_KEY } from './secret';

export async function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            'code-completion.webview',
            new MyWebviewViewProvider(context)
        )
    );
}

const getCurrentEditorCode = () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;

        return document.getText();
    }
    return 'There is no editor open';
};

const llmInvoke = async (messages: [], prompt: string) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${OPENAI_API_KEY}`);

    const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant.',
                },
                ...messages,
                {
                    role: 'system',
                    content: `Here is the context of the current file
                    
                    ${getCurrentEditorCode()}`,
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        }),
    };
    try {
        const response = await fetch(
            'https://api.openai.com/v1/chat/completions',
            requestOptions
        );
        const resJson = await response.json();
        console.log('LLM RESPONSE', resJson);
        if (resJson?.error) {
            throw resJson.error;
        }
        // @ts-ignore
        return resJson?.choices[0]?.message?.content;
    } catch (err) {
        console.error(err);
        return 'There was a server error';
    }
};

export class MyWebviewViewProvider implements vscode.WebviewViewProvider {
    constructor(private context: vscode.ExtensionContext) {}

    resolveWebviewView(
        webviewView: vscode.WebviewView,
        _: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        webviewView.webview.options = {
            enableScripts: true,
        };
        let scriptSrc = webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(
                this.context.extensionUri,
                'src',
                'client',
                'dist',
                'index.js'
            )
        );

        let cssSrc = webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(
                this.context.extensionUri,
                'src',
                'client',
                'dist',
                'index.css'
            )
        );

        webviewView.webview.html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <link rel="stylesheet" href="${cssSrc}" />
            </head>
            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="root"></div>
                <script src="${scriptSrc}"></script>
            </body>
            </html>
        `;
        webviewView.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.command) {
                    case 'chat-newMessage-human':
                        const llmResponse = await llmInvoke(
                            message.messages,
                            message.prompt
                        );
                        webviewView.webview.postMessage({
                            command: 'chat-newMesssage',
                            text: llmResponse,
                        });
                        return;
                }
            },
            undefined,
            this.context.subscriptions
        );
        webviewView.webview.onDidReceiveMessage(async (message) => {
            switch (message.command) {
                case 'showMessage':
                    vscode.window.showInformationMessage(message.text);
                    break;
            }
        });
    }
}

export function deactivate() {}
