// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(
        'Congratulations, your extension "code-completion" is now active in the web extension host!'
    );

    // // The command has been defined in the package.json file
    // // Now provide the implementation of the command with registerCommand
    // // The commandId parameter must match the command field in package.json
    // const disposable = vscode.commands.registerCommand('code-completion.helloWorld', () => {
    // 	// The code you place here will be executed every time your command is executed

    // 	// Display a message box to the user
    // 	// vscode.window.showInformationMessage('Hello World from code-completion in a web extension host!');
    // 	vscode.window.showInformationMessage('Testing 123 from extension!');
    // });

    // context.subscriptions.push(disposable);

    let webview = vscode.commands.registerCommand(
        'code-completion.helloWorld',
        () => {
            let panel = vscode.window.createWebviewPanel(
                'webview',
                'Web View',
                {
                    viewColumn: vscode.ViewColumn.One,
                },
                {
                    enableScripts: true,
                }
            );

            const scriptPath = panel.webview.asWebviewUri(
                vscode.Uri.joinPath(context.extensionUri, 'media', 'script.js')
            );

            panel.webview.html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="${scriptPath}"></script>
        </head>
        <body>
        <h1>Count:</h1>
            <p id="count">0</p>
        <button onclick="changeHeading()">Add</button>
        </body>
        </html>`;

            const cssStyle = panel.webview.asWebviewUri(
                vscode.Uri.joinPath(
                    context.extensionUri,
                    'media',
                    'globals.css'
                )
            );

            const imgSrc = panel.webview.asWebviewUri(
                vscode.Uri.joinPath(context.extensionUri, 'media', 'vim.svg')
            );

            // // will set the html here
            // panel.webview.html = `<!DOCTYPE html>
            //     <html lang="en">
            //     <head>
            //         <meta charset="UTF-8">
            //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
            //         <link rel="stylesheet" type="text/css" href="${cssStyle}" />
            //     </head>
            //     <body>
            //     <div class="container">
            //         <img src="${imgSrc}" width="200" />
            //         <div class="form">
            //             <code>Title</code>
            //             <input />
            //             <code>Code</code>
            //             <textarea></textarea>
            //             <button>Submit</button>
            //         </div>
            //     </div>
            //     </body>
            //     </html>`;
        }
    );

    context.subscriptions.push(webview);
}

// This method is called when your extension is deactivated
export function deactivate() {}
