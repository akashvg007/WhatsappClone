import React, { useState, useEffect } from 'react';
import './App.scss';
import LeftHandMenu from "./components/LeftContainer/LeftContainer";
import MainContainer from './components/MainContainer/MainContainer';
import LandingPage from './components/LandingPage/LandingPage';
import Register from './components/Register/Register';
import { getRecentChats } from "./Api/services";
import { getContact } from "./Api/services";

function App() {
  const [selected, setSelected] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [currentUser, setCurrentUser] = useState({})
  const [chatMsgs, setChatMsgs] = useState([])
  const [chatlist, setChatlist] = useState({})
  const [contact, setContact] = useState({});
  console.log("chats", chatMsgs);
  const getChats = async () => {
    const chats = await getRecentChats();
    console.log("getRecentChats::chats", chats);
    setChatMsgs(chats);
    const phone = localStorage.getItem("phone") || ""
    const users = {};
    chats.map(chat => {
      const { from, to, msg, time, status } = chat;
      const user = from === phone ? to : from;
      if (!users[user]) users[user] = [];
      const obj = { msg, time, status, from, to };
      users[user].push(obj);
    })
    console.log("getRecentChats::users", users);
    setChatlist(users)
  }
  const handleClick = (name) => {
    console.log("handleClick::clicked", name);
    setSelected(true);
    setCurrentUser(name);
  }
  const getAllContacts = async () => {
    const contacts = await getContact();
    const contactList = {}
    contacts.forEach(list => {
      const { name, phone } = list;
      if (!contactList[phone]) contactList[phone] = name;
    })
    setContact(contactList);
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
  return (
    <div className="App">
      <div className="back-header"></div>
      <div className="back-body"></div>
      <div className="main-body">
        {registered ? (
          <div className="container">
            <div className="lefthandmenu">
              <LeftHandMenu click={handleClick} contact={contact} list={chatlist} />
            </div>
            <div className="main-area">
              <div className="bglayer">
                {selected ? <MainContainer contact={contact} phone={currentUser} data={chatlist[currentUser]} />
                  : <LandingPage />
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
