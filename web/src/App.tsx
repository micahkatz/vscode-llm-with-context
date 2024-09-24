import {
  VSCodeButton,
  VSCodeDataGrid,
  VSCodeDataGridRow,
  VSCodeDataGridCell,
  VSCodeTextField,
  VSCodeProgressRing,
} from "@vscode/webview-ui-toolkit/react";
import './App.css'
import "vscode-webview"
import React, { useEffect } from 'react'
import Markdown from 'react-markdown'

function App() {
  const [messages, setMessages] = React.useState<{ role: 'user' | 'assistant', content: string }[]>([])

  const [newMessage, setNewMessage] = React.useState('')

  const handleSendClick = () => {
    const vscode = acquireVsCodeApi();
    vscode.postMessage({
      command: 'chat-newMessage-human',
      messages,
      prompt: newMessage
    })
    setMessages(messages => [...messages, {
      role: 'user',
      content: newMessage
    }])
    setNewMessage('')
  }

  const handleExtensionMessageReceived = (event: MessageEvent) => {
    const message = event?.data; // The JSON data our extension sent

    switch (message?.command) {
      case 'chat-newMesssage':
        setMessages(messages => [...messages, {
          role: 'assistant',
          content: message?.text
        }])
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleExtensionMessageReceived);
    return () => {
      window.removeEventListener('message', handleExtensionMessageReceived)
    }
  }, [])


  return (
    <div>
      <div className="main">
        <VSCodeDataGrid>
          {messages.map((msg) => (
            <VSCodeDataGridRow>
              <VSCodeDataGridCell grid-column="1">
                <h2>{msg.role === 'assistant' ? 'ChatGPT' : 'You'}</h2>
                <Markdown>{msg.content}</Markdown>
              </VSCodeDataGridCell>
            </VSCodeDataGridRow>
          ))}
        </VSCodeDataGrid>
      </div>
      <span className="messageInputWrapper">
        <VSCodeTextField
          className='messageInput'
          value={newMessage}
          // @ts-ignore
          onInput={e => setNewMessage(e.target?.value)}
        />
        <VSCodeButton
          className="sendButton"
          onClick={(e) => {
            e.preventDefault()
            handleSendClick()
          }}
          type="submit"
        >Send</VSCodeButton>
      </span>
    </div>
  );
}

export default App;