import React from 'react';
import "./ChatPeople.scss";
import { Done, DoneAll } from '@mui/icons-material';
export default function ChatPeople(props) {
    const { data, click } = props;
    const { name, photo, lastMsg, status, time, id } = data;
    console.log("props check", props);
    const handleClick = e => {
        console.log("chatpeople clicked");
        click(data);
    }

    return (
        <div id="chatpeople" onClick={handleClick}>
            <div className="pic">
                <img src={photo} alt="" />
            </div>
            <div className="details">
                <div className="title">
                    <div className="name">
                        {name}
                    </div>
                    <div className="lastMsg">
                        <div className="status">
                            {
                                status == 1 ?
                                    <Done />
                                    : <DoneAll />
                            }
                        </div>
                        <div className="message">
                            {lastMsg}
                        </div>
                    </div>
                </div>
                <div className="time">
                    {time}
                </div>
            </div>
        </div>
    )
}
