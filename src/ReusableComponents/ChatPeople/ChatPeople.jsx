import React, { useEffect, useState } from 'react';
import "./ChatPeople.scss";
import { Done, DoneAll } from '@mui/icons-material';
import moment from 'moment';
import { getLastMessageHelper } from '../../Helper/logicHelper';

export default function ChatPeople(props) {
    const { data, click, name, contact, newContact = false } = props;
    const [lastMsg, setLastMsg] = useState({});

    let photo = "avatar.jpg";
    if (props?.photo[name]) photo = props.photo[name];
    let contactName = contact || name;
    if (!contact && name === "+918848275018") contactName = "Admin"
    const handleClick = e => {
        click(name);
    }
    useEffect(() => {
        getLastMessageHelper(data, setLastMsg)
    }, [])
    return (
        <div id="chatpeople" onClick={handleClick}>
            <div className="pic">
                <img src={photo} alt="" />
            </div>
            <div className="details">
                <div className="title">
                    <div className="name">
                        {contactName}
                    </div>
                    {!newContact && <div className="lastMsg">
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
                    </div>}
                </div>
                <div className="time">
                    {moment(lastMsg.time).format('LT')}
                </div>
            </div>
        </div>
    )
}
