import React, { useState, useEffect, useCallback } from 'react';
import Header from "../../ReusableComponents/CommonHeader/CommonHeader";
import "./MainContainer.scss";
import SearchField from '../../ReusableComponents/Search/Search';
import { Search, MoreVert, InsertEmoticon, Attachment, Mic, Send } from '@mui/icons-material';
import CommonIcon from "../../ReusableComponents/CommonIconWrapper/CommonIconWrapper";
import { getMessageOne, getLastSeen } from "../../Api/services";
import { useConversations } from '../../contexts/ConversationsProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Emoji from '../../ReusableComponents/Emoji/Emoji'
import { useSocket } from '../../contexts/SocketProvider';
import moment from 'moment';

export default function MainContainer({ phone, dp, contact }) {
    const socket = useSocket()
    const iconArr = [{ Comp: Search, click: null, key: 'icon1' }, { Comp: MoreVert, click: null, key: 'icon2' }];
    const [value, setValue] = useState("");
    const [loader, setLoader] = useState(false);
    const [emojiOpen, setEmojiOpen] = useState(false)
    const [viewImage, setViewImage] = useState(false);
    const [online, setOnline] = useState('offline');
    const [showNumber, setShowNumber] = useState(false);
    const [lastSeen, SetLastSeen] = useState('');

    const setRef = useCallback(node => {
        if (node) node.scrollIntoView({ smooth: true })
    }, [])
    const { sendMessageContext, getData, state } = useConversations()

    const photo = dp || "avatar.jpg";
    const myNum = localStorage.getItem("phone");

    const getEmoji = (emoji) => {
        console.log("getemoji::emoji", emoji.unicode);
        let newVal = value;
        console.log("getemoji::value", value);
        newVal += emoji.unicode;
        console.log("getemoji::newval", newVal);
        setValue(newVal);
        setEmojiOpen(false)
    }

    const handleSendMessage = async () => {
        if (value == "") return;
        sendMessageContext(phone, value)
        setValue("")
    }
    const handleClickEmoji = () => {
        setEmojiOpen(!emojiOpen)
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
        await getMessageOne(payload);
        const result = localStorage.getItem("whatsApp-chat-" + phone)
        const data = JSON.parse(result).data;
        console.log("data", data);

        getData(data);
        setLoader(false)
    }
    const handleDobleClick = () => {
        setViewImage(!viewImage)
    }
    const handleLastSeen = async () => {
        const result = await getLastSeen({ phone });
        if (!result) return;
        const time = result[0]?.lastseen;
        if (!time) return
        const date = moment(time).calendar();
        SetLastSeen(date)
    }
    useEffect(() => {
        handleLastSeen()
    }, [phone, online])

    useEffect(() => {
        getNewMessages();
    }, [phone])

    const checkOnline = async ({ ids, status }) => {
        try {
            // console.log('checkOnline', ids, status);
            if (ids && Array.isArray(ids) && ids.length && status == 1) {
                if (ids.includes(phone)) {
                    setOnline('online');
                }
                else setOnline('offline')
            }
            else {
                setOnline('offline');
            }
        }
        catch (e) {
            console.log("something went wrong", e.message);
            setOnline('offline')
        }
    }

    useEffect(() => {
        if (socket == null) return
        socket.on('online', checkOnline)
        socket.on('offline', checkOnline)
    }, [socket, checkOnline])

    return (
        <div id="mainContainer">
            <Header>
                <div className="title">

                    <div className="img" onTouchStart={handleDobleClick} onDoubleClick={handleDobleClick}>
                        <img src={photo} alt="profile pic" />
                    </div>
                    <div className="user-abbri">
                        {!showNumber && <div className="user-name cursor-ptr" onClick={e => setShowNumber(!showNumber)}>
                            {contact[phone] || phone}
                        </div>}
                        {showNumber && <div className="user-name cursor-ptr" onClick={e => setShowNumber(!showNumber)}>
                            {phone}
                        </div>}
                        <div className="user-lastseen">{online == 'online' ? online : lastSeen}</div>
                    </div>
                </div>
                <div className="icons">
                    {
                        iconArr.map((icon, idx) => (
                            <CommonIcon key={icon.key || idx + "icon"} Component={icon.Comp} click={icon.click} />
                        ))
                    }
                </div>
            </Header>
            {
                viewImage && <div className="viewimage" onTouchStart={handleDobleClick} onDoubleClick={handleDobleClick}>
                    <img src={photo} alt="" width="auto" height="80%" />
                </div>
            }
            {loader || !state ? (<div className="loader">
                <CircularProgress />
            </div>)
                : (<section>
                    {
                        state?.map((chat, idx) => {
                            const lastMsg = idx === 0;
                            const date = moment(chat.time).format("MMM Do YY");
                            const curr = moment(chat.time).format("MMM Do YY");
                            let prev = "";
                            if (state[idx + 1]) prev = moment(state[idx + 1].time).format("MMM Do YY");
                            const showDate = () => {
                                const compareString = curr.localeCompare(prev)
                                if (compareString !== 0) (
                                    <div className="chat-date">
                                        <div className="date-wrapper">{date}</div>
                                    </div>
                                )
                            }

                            return (
                                <>
                                    <div ref={lastMsg ? setRef : null} className={`chat-region ${chat.from === myNum ? 'right' : 'left'}-side`}>
                                        <div className={`chat ${chat.from === myNum ? 'right' : 'left'}-chat`}>
                                            <div className="chatwrapper">{chat.msg}</div>
                                            <div className={`time  ${chat.from === myNum ? 'right' : 'left'}-side`}>
                                                {moment(chat.time).format('LT')}
                                            </div>
                                        </div>
                                    </div>
                                    {showDate()}
                                </>
                            )
                        })
                    }

                </section>)}
            <footer>
                <div className="emoji">
                    <CommonIcon Component={InsertEmoticon} click={handleClickEmoji} />
                    {emojiOpen && <div className="emojiContainer">
                        <Emoji getEmoji={getEmoji} />
                    </div>}
                </div>
                {/* <div className="attachment">
                    <CommonIcon Component={Attachment} />
                </div> */}
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
