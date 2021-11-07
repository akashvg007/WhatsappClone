import React, { useState, useEffect } from 'react';
import './App.scss';
import LeftHandMenu from "./components/LeftContainer/LeftContainer";
import MainContainer from './components/MainContainer/MainContainer';
import LandingPage from './components/LandingPage/LandingPage';
import Register from './components/Register/Register';
import { getRecentChats, getAllMyContacts, getContact } from "./Api/services";
import { ConversationsProvider } from './contexts/ConversationsProvider';
import { SocketProvider } from './contexts/SocketProvider';

function App() {
  const [selected, setSelected] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [currentUser, setCurrentUser] = useState('')
  const [chatMsgs, setChatMsgs] = useState([])
  const [chatlist, setChatlist] = useState({})
  const [contact, setContact] = useState({});
  const [loader, setLoader] = useState(false);
  const [pp, setPP] = useState({})

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
    console.log("contacts::contactList", contacts, contactList);

    setContact(contactList);
    setLoader(false)
  }
  const getAllMyChatContacts = async () => {
    console.log("called the getAllmyChatContacts")
    setLoader(true);
    const list = await getAllMyContacts();
    const profilePicData = {};
    list.forEach(profile => {
      const { profilePic, phone } = profile;
      if (!profilePicData[phone]) profilePicData[phone] = profilePic;
    })
    setPP(profilePicData);
    console.log("dp1", profilePicData);
    setLoader(false);
  }

  useEffect(() => {
    if (registered) getChats();
  }, [registered])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setRegistered(true);
      getAllContacts()
      getAllMyChatContacts();
    }
  }, [chatlist])

  const dashboard = (
    <SocketProvider id={myPhone}>
      <ConversationsProvider id={myPhone}>
        <MainContainer contact={contact} dp={pp[currentUser]}
          phone={currentUser} />
      </ConversationsProvider>
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
              <LeftHandMenu click={handleClick} dp={pp[myPhone]} profiles={pp} getAllContacts={getAllContacts}
                contact={contact} list={chatlist} />
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
