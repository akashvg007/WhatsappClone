import React, { useState, useEffect } from 'react';
import Header from "../CommonHeader/CommonHeader";
import "./MainContainer.scss";
import SearchField from '../Search/Search';
import { Search, MoreVert, InsertEmoticon, Attachment, Mic, Send } from '@mui/icons-material';
import CommonIcon from "../CommonIconWrapper/CommonIconWrapper";
import { sendMessage } from "../../Api/services";

export default function MainContainer({ data, phone, dp, contact }) {
    const iconArr = [Search, MoreVert];
    const [value, setValue] = useState("");
    const [chats, setChats] = useState([]);
    const photo = dp || "avatar.jpg";
    const myNum = localStorage.getItem("phone");

    const handleSendMessage = async () => {
        if (value == "") return;
        const newChat = [...chats];
        console.log("beforeshift", newChat);
        const from = localStorage.getItem("phone");
        const messageObj = { msg: value, to: phone, from, time: Date.now(), status: 1 };
        newChat.unshift(messageObj)
        console.log("aftershift", newChat);
        setChats(newChat)
        await sendMessage(messageObj);
        setValue("")
    }
    const handleKeyDown = (e) => {
        console.log("keyPress", e);
        if (e.key == 'Enter') {
            handleSendMessage();
            setValue("")
        }
    }
    const handleChange = (val) => {
        setValue(val);
    }
    useEffect(() => {
        setChats(data)
    }, [data])

    return (
        <div id="mainContainer">
            <Header>
                <div className="title">
                    <div className="img">
                        <img src={photo} alt="profile pic" />
                    </div>
                    <div className="user-abbri">
                        <div className="user-name">{contact[phone] || phone}</div>
                        <div className="user-lastseen">{'online'}</div>
                    </div>
                </div>
                <div className="icons">
                    {
                        iconArr.map(comp => (
                            <CommonIcon Component={comp} />
                        ))
                    }
                </div>
            </Header>
            <section>
                {
                    chats.map(chat => (
                        <div className={`chat-region ${chat.from === myNum ? 'right' : 'left'}-side`}>
                            <div className={`chat ${chat.from === myNum ? 'right' : 'left'}-chat`}>
                                {chat.msg}
                            </div>
                        </div>
                    ))
                }

            </section>
            <footer>
                <div className="emoji">
                    <CommonIcon Component={InsertEmoticon} />
                </div>
                <div className="attachment">
                    <CommonIcon Component={Attachment} />
                </div>
                <div className="message-box">
                    <SearchField text="Type a message"
                        KeyDown={handleKeyDown}
                        setVal={handleChange}
                        value={value}
                    />
                </div>
                <div className="record" onClick={handleSendMessage}>
                    <CommonIcon Component={value == "" ? Mic : Send} />
                </div>
            </footer>
        </div>
    )
}
