import React from 'react';
import Header from "../CommonHeader/CommonHeader";
import SearchField from '../Search/Search';
import "./LeftContainer.scss";
import { DonutLarge, Message, MoreVert } from '@mui/icons-material';
import CommonIcon from "../CommonIconWrapper/CommonIconWrapper"
import { data } from "../../data/data";
import ChatPeople from "../ChatPeople/ChatPeople";
export default function LeftContainer() {
    const iconArr = [DonutLarge, Message, MoreVert];
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
            <SearchField />
            <div className="list-container">
                {
                    data.map(chat => (
                        <ChatPeople data={chat} />
                    ))
                }
            </div>
        </div>
    )
}
