import React, { useState, useEffect } from 'react';
import Header from "../CommonHeader/CommonHeader";
import SearchField from '../Search/Search';
import "./LeftContainer.scss";
import { DonutLarge, Message, MoreVert } from '@mui/icons-material';
import CommonIcon from "../CommonIconWrapper/CommonIconWrapper"
import { data } from "../../data/data";
import ChatPeople from "../ChatPeople/ChatPeople";
import { getContact } from "../../Api/services";

export default function LeftContainer({ click, list, contact }) {
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
                    Object.keys(list).map(chat => (
                        <ChatPeople contact={contact[chat]} name={chat} click={click} data={list[chat]} />
                    ))
                }
            </div>
        </div>
    )
}
