import React, { useState } from 'react';
import Header from "../CommonHeader/CommonHeader";
import "./MainContainer.scss";
import SearchField from '../Search/Search';
import { Search, MoreVert, InsertEmoticon, Attachment, Mic, Send } from '@mui/icons-material';
import CommonIcon from "../CommonIconWrapper/CommonIconWrapper"
export default function MainContainer({ data }) {
    const iconArr = [Search, MoreVert];
    const [value, setValue] = useState("");
    return (
        <div id="mainContainer">
            <Header>
                <div className="title">
                    <div className="img">
                        <img src={data.photo} alt="profile pic" />
                    </div>
                    <div className="user-abbri">
                        <div className="user-name">{data.name}</div>
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
            <footer>
                <div className="emoji">
                    <CommonIcon Component={InsertEmoticon} />
                </div>
                <div className="attachment">
                    <CommonIcon Component={Attachment} />
                </div>
                <div className="message-box">
                    <SearchField text="Type a message" value={setValue} />
                </div>
                <div className="record">
                    <CommonIcon Component={value == "" ? Mic : Send} />
                </div>
            </footer>
        </div>
    )
}
