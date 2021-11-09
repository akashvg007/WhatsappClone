import React, { useContext, useState, useEffect, useCallback } from 'react'
import { sendMessage } from "../Api/services";

import { useSocket } from './SocketProvider';

const ConversationsContext = React.createContext(null)

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, children }) {
  const socket = useSocket()
  const [state, setState] = useState([])

  const myNum = localStorage.getItem("phone");
  const addMessageToConversation = useCallback(async ({ recipient, text, sender, status = 2 }) => {
    const messageObj = { msg: text, to: recipient, from: sender, time: Date.now(), status };
    setState(prev => {
      return [messageObj, ...prev]
    })
    if (sender === myNum && status === 1) {
      await sendMessage(messageObj);
    }
  }, [setState])


  useEffect(() => {
    if (socket == null) return
    socket.on('receive-message', addMessageToConversation)
    return () => {
      socket.off('receive-message')
    }
  }, [socket, addMessageToConversation])

  function sendMessageContext(recipient, text) {
    socket.emit('send-message', { recipient, text })
    addMessageToConversation({ recipient, text, sender: id, status: 1 })
  }

  const getData = (data = []) => {
    setState(data)
  }

  const value = {
    sendMessageContext,
    getData,
    state
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}