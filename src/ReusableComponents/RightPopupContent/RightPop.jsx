import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Popup from '../../ReusableComponents/popup/popup';
import { addContact } from "../../Api/services";
import SelectField from '../../ReusableComponents/Select/Select';

export default function LeftPopup({ getAllContacts, setAnchorEl, popup, phone }) {
    const [contactName, setContactName] = useState("")
    const [open, setOpen] = useState(popup)

    const contactNameChange = e => {
        e.stopPropagation()
        setContactName(e.target.value);
    }
    useEffect(() => {
        setOpen(popup)
    }, [popup])

    const handleAddContact = async (e) => {
        e.stopPropagation()
        const no = "+91" + phone;
        await addContact({ phone: no, name: contactName });
        setOpen(false)
        setAnchorEl(null)
        getAllContacts()
    }

    const popupClose = e => {
        setOpen(false)
    }
    const buttonList = [
        { title: "Add", handleClick: handleAddContact },
        { title: "Cancel", handleClick: popupClose }
    ]
    return (
        <Popup open={open} title="Add to contact" className="popup-wrapper" btns={buttonList} handleClose={popupClose}>
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