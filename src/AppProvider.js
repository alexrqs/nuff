import React, { createContext, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import Api from './Api'

import { PRIORITY } from './utils/enums';

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

export default AppProvider
