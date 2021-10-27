import React, { useState } from 'react';
import Header from "../CommonHeader/CommonHeader";
import SearchField from '../Search/Search';
import "./LeftContainer.scss";
import { DonutLarge, Message, MoreVert } from '@mui/icons-material';
import CommonIcon from "../CommonIconWrapper/CommonIconWrapper"
import { data } from "../../data/data";
import ChatPeople from "../ChatPeople/ChatPeople";
export default function LeftContainer({ click }) {
    const iconArr = [DonutLarge, Message, MoreVert];
    const [value, setValue] = useState("");
    return (
        <div id="leftContainer">
            <Header>
                <div className="img">
                    <img src="pp.jpg" alt="profile pic" />
                </div>
                <div className="icons">
                    {
                        iconArr.map(comp => (
                            <CommonIcon Component={comp} />
                        ))
                    }
                </div>
            </Header>
            <div className="search-wrapper">
                <SearchField text="Search or start a new chat" value={setValue} />
            </div>
            <div className="list-container">
                {
                    data.map(chat => (
                        <ChatPeople click={click} data={chat} />
                    ))
                }
            </div>
        </div>
    )
}
