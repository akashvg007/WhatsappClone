import React, { useState, useEffect, useCallback } from 'react';
import Header from "../../ReusableComponents/CommonHeader/CommonHeader";
import "./MainContainer.scss";
import SearchField from '../../ReusableComponents/Search/Search';
import { Search, MoreVert, InsertEmoticon, Attachment, Mic, Send } from '@mui/icons-material';
import CommonIcon from "../../ReusableComponents/CommonIconWrapper/CommonIconWrapper";
import { getMessageOne } from "../../Api/services";
import { useConversations } from '../../contexts/ConversationsProvider';
import CircularProgress from '@mui/material/CircularProgress';

export default function MainContainer({ phone, dp, contact }) {
    const iconArr = [{ Comp: Search, click: null }, { Comp: MoreVert, click: null }];
    const [value, setValue] = useState("");
    const [loader, setLoader] = useState(false);

    const setRef = useCallback(node => {
        if (node) node.scrollIntoView({ smooth: true })
    }, [])
    const { sendMessageContext, getData, state } = useConversations()

    const photo = dp || "avatar.jpg";
    const myNum = localStorage.getItem("phone");

    console.log("state", state)

    const handleSendMessage = async () => {
        if (value == "") return;
        sendMessageContext(phone, value)
        setValue("")
    }
    const handleKeyDown = (e) => {
        if (e.key == 'Enter') handleSendMessage();
    }
    const handleChange = (val) => {
        setValue(val);
    }
    const getNewMessages = async () => {
        setLoader(true)
        const payload = { from: myNum, to: phone }
        const result = await getMessageOne(payload);
        getData(result);
        setLoader(false)
    }
    useEffect(() => {
        getNewMessages();
    }, [])

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
                        iconArr.map(icon => (
                            <CommonIcon Component={icon.Comp} click={icon.click} />
                        ))
                    }
                </div>
            </Header>
            {loader || !state ? (<CircularProgress />)
                : (<section>
                    {
                        state?.map((chat, idx) => {
                            const lastMsg = idx === 0;
                            return (
                                <div ref={lastMsg ? setRef : null} className={`chat-region ${chat.from === myNum ? 'right' : 'left'}-side`}>
                                    <div className={`chat ${chat.from === myNum ? 'right' : 'left'}-chat`}>
                                        {chat.msg}
                                    </div>
                                </div>
                            )
                        })
                    }

                </section>)}
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
