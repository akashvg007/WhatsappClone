import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Popup from '../../ReusableComponents/popup/popup';
import { addContact } from "../../Api/services";
import SelectField from '../../ReusableComponents/Select/Select';

export default function LeftPopup({ getAllContacts, setAnchorEl, popup }) {
    const [phone, setPhone] = useState("")
    const [contactName, setContactName] = useState("")
    const [open, setOpen] = useState(popup)
    const [countryCode, setCountryCode] = useState('+91')
    const PhoneChange = e => {
        e.stopPropagation();
        setPhone(e.target.value);
    }
    const contactNameChange = e => {
        e.stopPropagation()
        setContactName(e.target.value);
    }
    useEffect(() => {
        setOpen(popup)
    }, [popup])
    const handlecountryChange = (val) => {
        setCountryCode(val)
    }
    const handleAddContact = async (e) => {
        e.stopPropagation()
        const no = "+91" + phone;
        await addContact({ phone: no, name: contactName });
        setOpen(false)
        setAnchorEl(null)
        getAllContacts()
    }
    const dummy = () => {
        // need to work on the pop up msg
    }
    const popupClose = e => {
        setOpen(false)
    }
    const buttonList = [
        { title: "Add", handleClick: handleAddContact },
        { title: "Cancel", handleClick: dummy }
    ]
    return (
        <Popup open={open} title="Add Contact" className="popup-wrapper" btns={buttonList} handleClose={popupClose}>
            <div className="text-field-wrapper">
                <div className="code">
                    <SelectField data={["+91", "+97"]} change={handlecountryChange} newValue={countryCode} value={countryCode} />
                </div>
                <div className="phone">
                    <TextField id="phone"
                        style={{ width: "100%" }}
                        label="phone number"
                        value={phone}
                        onChange={PhoneChange}
                        variant="standard"
                        inputProps={{ maxLength: 10 }} />
                </div>
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