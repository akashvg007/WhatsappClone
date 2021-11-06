import React, { useState, useEffect } from 'react';
import './App.scss';
import LeftHandMenu from "./components/LeftContainer/LeftContainer";
import MainContainer from './components/MainContainer/MainContainer';
import LandingPage from './components/LandingPage/LandingPage';
import Register from './components/Register/Register';
import { getRecentChats } from "./Api/services";
import { getContact } from "./Api/services";
import { ContactsProvider } from './contexts/ContactsProvider'
import { ConversationsProvider } from './contexts/ConversationsProvider';
import { SocketProvider } from './contexts/SocketProvider';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [selected, setSelected] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [currentUser, setCurrentUser] = useState('')
  const [chatMsgs, setChatMsgs] = useState([])
  const [chatlist, setChatlist] = useState({})
  const [contact, setContact] = useState({});
  const [loader, setLoader] = useState(false);
  const [id, setId] = useLocalStorage('id')

  const myPhone = localStorage.getItem("phone") || ""
  const getChats = async () => {
    setLoader(true);
    const chats = await getRecentChats();
    setChatMsgs(chats);
    const users = {};
    chats.map(chat => {
      const { from, to, msg, time, status } = chat;
      const user = from === myPhone ? to : from;
      if (!users[user]) users[user] = [];
      const obj = { msg, time, status, from, to };
      users[user].push(obj);
    })
    setChatlist(users)
    setLoader(false);
  }
  const handleClick = (name) => {
    setSelected(true);
    setCurrentUser(name);
  }
  const getAllContacts = async () => {
    setLoader(true)
    const contacts = await getContact();
    const contactList = {}
    contacts.forEach(list => {
      const { name, phone } = list;
      if (!contactList[phone]) contactList[phone] = name;
    })
    setContact(contactList);
    setLoader(false)
  }

  useEffect(() => {
    if (registered) getChats();
  }, [registered])
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setRegistered(true);
      getAllContacts()
    }
  }, [])

  const dashboard = (
    <SocketProvider id={myPhone}>
      <ContactsProvider>
        <ConversationsProvider id={myPhone}>
          <MainContainer contact={contact} dp={undefined}
            phone={currentUser} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )
  return (
    <div className="App">
      <div className="back-header"></div>
      <div className="back-body"></div>
      <div className="main-body">
        {registered ? (
          <div className="container">
            <div className="lefthandmenu">
              <LeftHandMenu click={handleClick} getAllContacts={getAllContacts} contact={contact} list={chatlist} />
            </div>
            <div className="main-area">
              <div className="bglayer">
                {selected
                  ? dashboard
                  : <LandingPage loader={loader} />
                }
              </div>
            </div>
          </div>
        ) : (
          <Register register={setRegistered} />
        )}
      </div>
    </div>
  );
}

export default App;
