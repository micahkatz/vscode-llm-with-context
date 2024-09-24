import {
  VSCodeButton,
  VSCodeDataGrid,
  VSCodeDataGridRow,
  VSCodeDataGridCell,
  VSCodeTextField,
  VSCodeProgressRing,
} from "@vscode/webview-ui-toolkit/react";
import './App.css'
import React, { useEffect } from 'react'
import Markdown from 'react-markdown'

const vscode = acquireVsCodeApi();
type MessageType = { role: 'user' | 'assistant', content: string }
function App() {
  const [messages, setMessages] = React.useState<MessageType[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [newMessage, setNewMessage] = React.useState('')

  const handleSendClick = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent VS Code from reloading the window and redirecting
    e.preventDefault()

    // render loading indicator
    setIsLoading(true)

    const prevMessages = [...messages]
    setMessages(messages => [...messages, {
      role: 'user',
      content: newMessage
    }])
    setNewMessage('')

    // send message to server
    vscode.postMessage({
      command: 'chat-newMessage-human',
      messages: prevMessages,
      prompt: newMessage
    })
  }

  // listen to messages from server  
  const handleExtensionMessageReceived = (event: MessageEvent) => {
    const message = event?.data;

    switch (message?.command) {
      // a new message was sent from the server and should be appended to the chat history
      case 'chat-newMesssage':
        setIsLoading(false) // stop the loading indicator
        setMessages(messages => [
          ...messages,
          {
            role: 'assistant',
            content: message?.text
          }
        ])
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
                <h2>{msg.role === 'assistant' ? 'GPT 3.5 Turbo' : 'You'}</h2>
                <Markdown>{msg.content}</Markdown>
              </VSCodeDataGridCell>
            </VSCodeDataGridRow>
          ))}
          {isLoading && (
            <VSCodeDataGridRow>
              <VSCodeDataGridCell grid-column="1">
                <h2>GPT 3.5 Turbo</h2>
                <div className="loading-cell">
                  <VSCodeProgressRing />
                </div>
              </VSCodeDataGridCell>
            </VSCodeDataGridRow>
          )}
        </VSCodeDataGrid>
      </div>
      <form className="messageInputWrapper" onSubmit={handleSendClick}>
        <VSCodeTextField
          className='messageInput'
          value={newMessage}
          onInput={e => {
            const { value } = e.target as HTMLInputElement
            setNewMessage(value)
          }}
        />
        <VSCodeButton
          className="sendButton"
          type="submit"
        >Send</VSCodeButton>
      </form>
    </div>
  );
}

export default App;