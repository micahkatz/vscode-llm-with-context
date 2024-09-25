import {
  VSCodeButton,
  VSCodeDataGrid,
  VSCodeDataGridRow,
  VSCodeDataGridCell,
  VSCodeTextField,
  VSCodeProgressRing,
  VSCodeDivider
} from "@vscode/webview-ui-toolkit/react";
import './App.css'
import React, { useEffect } from 'react'
import Markdown from 'react-markdown'
import moment, { Moment } from "moment";

const vscode = acquireVsCodeApi();
type MessageType = { role: 'user' | 'assistant', content: string, timestamp: Moment }
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
      content: newMessage,
      timestamp: moment()
    }])
    setNewMessage('')

    // send message to server
    vscode.postMessage({
      command: 'chat-newMessage-human',
      // remove any extra information besides role and content from the messages before sending it to the server
      messages: prevMessages.map(msg => {
        return { role: msg.role, content: msg.content }
      }),
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
            content: message?.text,
            timestamp: moment()
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
    <>
      <div className="main">
        <VSCodeDataGrid>
          {messages.length <= 0 && (
            <div className='noMessagesWrapper'>
              <h1>No chats yet</h1>
              <p>Enter a message to ask about the current file you have open.</p>
            </div>
          )}
          {messages.map((msg, index) => (
            <>
              <VSCodeDataGridRow>
                <VSCodeDataGridCell grid-column="1">
                  <h2>{msg.role === 'assistant' ? 'GPT 3.5 Turbo' : 'You'}</h2>
                  <Markdown>{msg.content}</Markdown>
                  <h5>{msg.timestamp.calendar()}</h5>
                </VSCodeDataGridCell>
              </VSCodeDataGridRow>
              {index < messages.length - 1 && <VSCodeDivider />}
            </>
          ))}
          {isLoading && (
            <>
              <VSCodeDivider />
              <VSCodeDataGridRow>
                <VSCodeDataGridCell grid-column="1">
                  <h2>GPT 3.5 Turbo</h2>
                  <div className="loading-cell">
                    <VSCodeProgressRing />
                  </div>
                </VSCodeDataGridCell>
              </VSCodeDataGridRow>
            </>
          )}
        </VSCodeDataGrid>
      </div>
      <form className="messageInputWrapper" onSubmit={handleSendClick}>
        <VSCodeTextField
          className='messageInput'
          value={newMessage}
          placeholder="Enter a message"
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
    </>
  );
}

export default App;