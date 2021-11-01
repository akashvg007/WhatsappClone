import React, { useEffect, useState } from 'react';
import "./ChatPeople.scss";
import { Done, DoneAll } from '@mui/icons-material';
import moment from 'moment';

export default function ChatPeople(props) {
    const { data, click, name, contact } = props;
    const [lastMsg, setLastMsg] = useState({});
    // const [contactName, setContactName] = useState("");
    const photo = props.photo || "avatar.jpg";

    console.log("props check", props);
    const handleClick = e => {
        console.log("chatpeople clicked");
        click(name);
    }
    const getLastMessage = () => {
        if (!data || !Array.isArray(data)) return;
        const last = data[0];
        data.forEach(chat => {
            if (chat.time > last.time) last = chat;
        })
        setLastMsg(last);
    }
    // useEffect(() => {
    //     console.log("contact name", contactName)
    //     contact ? setContactName(contact) : setContactName(name);
    // }, [contact])
    useEffect(() => {
        getLastMessage();
    }, [])
    return (
        <div id="chatpeople" onClick={handleClick}>
            <div className="pic">
                <img src={photo} alt="" />
            </div>
            <div className="details">
                <div className="title">
                    <div className="name">
                        {contact || name}
                    </div>
                    <div className="lastMsg">
                        <div className="status">
                            {
                                lastMsg?.status == 1 ?
                                    <Done />
                                    : <DoneAll />
                            }
                        </div>
                        <div className="message">
                            {lastMsg?.msg?.substring(0, 20) + "..."}
                        </div>
                    </div>
                </div>
                <div className="time">
                    {moment(lastMsg.time).format('LT')}
                </div>
            </div>
        </div>
    )
}
