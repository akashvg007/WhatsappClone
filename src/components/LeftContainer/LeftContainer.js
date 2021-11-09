import React, { useState, useEffect } from 'react';
import Header from "../../ReusableComponents/CommonHeader/CommonHeader";
import SearchField from '../../ReusableComponents/Search/Search';
import "./LeftContainer.scss";
import { DonutLarge, Message, MoreVert } from '@mui/icons-material';
import CommonIcon from "../../ReusableComponents/CommonIconWrapper/CommonIconWrapper"
import ChatPeople from "../../ReusableComponents/ChatPeople/ChatPeople";
import CustomMenu from '../../ReusableComponents/Menu/Menu';
import LeftPopup from '../../ReusableComponents/LeftPopupContent/LeftPopupContent';
import ImageUpload from '../../ReusableComponents/Uploader/ImageUpload';

export default function LeftContainer({ click, list, contact, getAllContacts, profiles, dp = null }) {

    const [value, setValue] = useState("");
    const [otherContacts, setOtherContacts] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [showUploader, setShowUploader] = useState(false);
    const [profilePic, setProfilePic] = useState("avatar.jpg");

    useEffect(() => {
        console.log("data change", dp);
        if (dp) setProfilePic(dp);
    }, [dp])

    const handleProfileChange = (e) => {
        e.stopPropagation()
        const result = window.confirm("do you want to change/add the profile");
        if (result) setShowUploader(true)
    }
    const handleClickMore = (e) => {
        console.log("icon clicked", e);
        e.stopPropagation()
        setAnchorEl(e.currentTarget);
    }
    const handleClose = (e) => {
        setAnchorEl(null);
    }
    const addContactFn = (e) => {
        e.stopPropagation()
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
            if (!list[cnt]) {
                other[cnt] = contact[cnt];
            }
        })
        setOtherContacts(other);
    }, [contact, list])

    return (
        <div id="leftContainer">
            <Header>
                <div className="img" onClick={handleProfileChange}>
                    <img src={profilePic} alt="profile pic" />
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
                        <ChatPeople contact={contact[chat]} photo={profiles} name={chat} click={click} data={list[chat]} />
                    ))
                }
                {
                    Object.keys(otherContacts).map(chat => (
                        <ChatPeople contact={otherContacts[chat]} photo={profiles} name={chat} click={click} newContact={true} data={otherContacts[chat]} />
                    ))
                }
            </div>
            <CustomMenu anchorEl={anchorEl} handleClose={handleClose} menuList={menuList} />
            <LeftPopup getAllContacts={getAllContacts} setAnchorEl={setAnchorEl} popup={open} />
            {
                showUploader && (
                    <>
                        <div className="upload-backdrop" onClick={() => setShowUploader(false)}></div>
                        <div className="upload">
                            <ImageUpload profilePic={profilePic} setProfilePic={setProfilePic} close={setShowUploader} />
                        </div>
                    </>
                )
            }
        </div>
    )
}
