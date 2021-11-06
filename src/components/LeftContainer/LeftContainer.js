import React, { useState, useEffect } from 'react';
import Header from "../../ReusableComponents/CommonHeader/CommonHeader";
import SearchField from '../../ReusableComponents/Search/Search';
import "./LeftContainer.scss";
import { DonutLarge, Message, MoreVert } from '@mui/icons-material';
import CommonIcon from "../../ReusableComponents/CommonIconWrapper/CommonIconWrapper"
import ChatPeople from "../../ReusableComponents/ChatPeople/ChatPeople";
import CustomMenu from '../../ReusableComponents/Menu/Menu';
import LeftPopup from '../../ReusableComponents/LeftPopupContent/LeftPopupContent';

export default function LeftContainer({ click, list, contact, getAllContacts }) {

    const [value, setValue] = useState("");
    const [otherContacts, setOtherContacts] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false)
    const handleClickMore = (e) => {
        console.log("icon clicked", e);
        setAnchorEl(e.currentTarget);
    }
    const handleClose = (e) => {
        setAnchorEl(null);
    }
    const addContactFn = () => {
        setOpen(true)
    }
    const dummy = () => {
        // need to work on the pop up msg
    }
    const iconArr = [
        { Comp: DonutLarge },
        { Comp: Message },
        { Comp: MoreVert, click: handleClickMore }
    ];
    const menuList = [
        { title: "Add a Contact", handleClick: addContactFn },
        { title: "Dummy", handleClick: dummy },
        { title: "Dummy", handleClick: dummy },
        { title: "Dummy", handleClick: dummy }
    ]

    useEffect(() => {
        const other = {};
        Object.keys(contact).forEach((cnt) => {
            if (Object.keys(list).length > 0 && !list[cnt]) {
                other[cnt] = contact[cnt];
            }
        })
        setOtherContacts(other);
    }, [contact, list])

    return (
        <div id="leftContainer">
            <Header>
                <div className="img">
                    <img src="pp.jpg" alt="profile pic" />
                </div>
                <div className="icons">
                    {
                        iconArr.map(icon => (
                            <CommonIcon Component={icon.Comp} click={icon.click} />
                        ))
                    }
                </div>
            </Header>
            <div className="search-wrapper">
                <SearchField text="Search or start a new chat" value={value} setVal={setValue} />
            </div>
            <div className="list-container">
                {
                    Object.keys(list).map(chat => (
                        <ChatPeople contact={contact[chat]} name={chat} click={click} data={list[chat]} />
                    ))
                }
                {
                    Object.keys(otherContacts).map(chat => (
                        <ChatPeople contact={otherContacts[chat]} name={chat} click={click} newContact={true} data={otherContacts[chat]} />
                    ))
                }
            </div>
            <CustomMenu anchorEl={anchorEl} handleClose={handleClose} menuList={menuList} />
            <LeftPopup getAllContacts={getAllContacts} setAnchorEl={setAnchorEl} popup={open} />
        </div>
    )
}
