import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

import MessageList from './components/MessageList'
import Api from './Api'
import { SnackbarError } from './components/SnackbarError';
import { PRIORITY } from './utils/enums';

const theme = createTheme({});

export const APIContext = createContext({
  isApiStarted: false,
  onDelete() {},
  messages: [],
  toggleApi() {},
  clearMessages() {},
})

const api = new Api({})

const AppProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [newError, setNewError] = useState('')

  api.messageCallback = (message) => {
    setMessages(messages => ([
      ...messages.slice(),
      message,
    ]))

    if (message.priority === PRIORITY.ERROR) {
      setNewError(message.message)
    }
  }

  const onDelete = (m) => {
    setMessages(messages => messages.filter(ms => ms.message != m.message))
  }

  const clearMessages = () => setMessages([])

  const [isApiStarted, setApiStarted] = useState(true)

  const toggleApi = () => {
    if (api?.isStarted?.()) {
      api.stop()
    } else {
      api.start()
    }
    setApiStarted(bool => !bool)
  }

  useEffect(() => {
    api.start()
  }, [])

  return (
    <APIContext.Provider value={{
      messages,
      onDelete,
      isApiStarted,
      toggleApi,
      clearMessages,
      newError,
    }}>
      {children}
    </APIContext.Provider>
  )
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <SnackbarError />
        <MessageList />
      </AppProvider>
    </ThemeProvider>
  )
}
