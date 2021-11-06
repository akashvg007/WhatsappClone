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

  const addMessageToConversation = async ({ recipient, text, sender, status = 2 }) => {
    console.log("addMessageToConversation", recipient, text, sender);
    const myNum = localStorage.getItem("phone");
    const newChat = [...state];
    const messageObj = { msg: text, to: recipient, from: sender, time: Date.now(), status };
    newChat.unshift(messageObj)
    console.log("Conversations Provider::newchat", newChat);

    setState(newChat)
    if (recipient === myNum) {
      await sendMessage(messageObj);
    }
  }

  useEffect(() => {
    if (socket == null) return
    console.log("inside the receiver", socket);

    socket.on('receive-message', addMessageToConversation)
    return () => socket.off('receive-message')
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