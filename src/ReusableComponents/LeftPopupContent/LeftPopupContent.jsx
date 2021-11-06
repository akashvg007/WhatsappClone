import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Popup from '../../ReusableComponents/popup/popup';
import { addContact } from "../../Api/services";

export default function LeftPopup({ getAllContacts, setAnchorEl, popup }) {
    const [phone, setPhone] = useState("")
    const [contactName, setContactName] = useState("")
    const [open, setOpen] = useState(popup)
    const PhoneChange = e => {
        setPhone(e.target.value);
    }
    const contactNameChange = e => {
        setContactName(e.target.value);
    }
    useEffect(() => {
        setOpen(popup)
    }, [popup])
    const handleAddContact = async (e) => {
        const no = "+91" + phone;
        await addContact({ phone: no, name: contactName });
        setOpen(false)
        setAnchorEl(null)
        getAllContacts()
    }
    const addContactFn = () => {
        setOpen(true)
    }
    const dummy = () => {
        // need to work on the pop up msg
    }
    const popupClose = e => {
        setOpen(false)
    }
    const menuList = [
        { title: "Add a Contact", handleClick: addContactFn },
        { title: "Dummy", handleClick: dummy },
        { title: "Dummy", handleClick: dummy },
        { title: "Dummy", handleClick: dummy }
    ]
    const buttonList = [
        { title: "Add", handleClick: handleAddContact },
        { title: "Cancel", handleClick: dummy }
    ]
    return (
        <Popup open={open} title="Add Contact" btns={buttonList} handleClose={popupClose}>
            <div className="text-field-wrapper">
                <TextField id="phone"
                    style={{ width: "100%" }}
                    label="phone number"
                    value={phone}
                    onChange={PhoneChange}
                    variant="standard"
                    inputProps={{ maxLength: 10 }} />
            </div>
            <div className="text-field-wrapper">
                <TextField id="name-text-field"
                    style={{ width: "100%" }}
                    label="Contact Name"
                    value={contactName}
                    onChange={contactNameChange}
                    variant="standard" />
            </div>
        </Popup>
    )
}