import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client';
import { chatService } from '../Api/urlConstants';

const SocketContext = React.createContext(null)

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState(null);
  console.log("socketProvider::id", id);

  useEffect(() => {
    const newSocket = io(
      chatService,
      { query: { id } }
    )
    setSocket(newSocket)
    return () => {
      newSocket.close()
    }
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
