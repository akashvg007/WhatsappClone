import React, { useState, useEffect } from 'react';
import ButtonPr from '../../ReusableComponents/Button/ButtonPr';
import SelectField from '../../ReusableComponents/Select/Select';
import TextField from '@mui/material/TextField';
import "./Register.scss";
import { registerUser, verifyOTP } from '../../Api/services';
export default function Register({ register }) {
    const [agree, setAgree] = useState(1)
    const [heading, setHeading] = useState("Welcome to WhatsApp");
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [countryCode, setCountryCode] = useState('+91')
    const handleClick = e => {
        setAgree(2);
    }
    const PhoneChange = (e) => {
        setPhone(e.target.value);
    }
    const handleNext = async (e) => {
        const no = countryCode + phone;
        await registerUser({ phone: no });
        setAgree(3);
    }
    const handlecountryChange = (val) => {
        console.log("handleCountryChange::val", val);
        const mapObj = {
            "india": "+91",
            "UAE": "+97"
        }
        setCountryCode(mapObj[val])
    }
    const handleVerify = async (e) => {
        const no = countryCode + phone;
        const resp = await verifyOTP({ phone: no, otp })
        localStorage.setItem("token", resp.accessToken);
        localStorage.setItem("phone", countryCode + phone);
        register(true)
    }
    const otpChange = e => {
        setOtp(e.target.value)
    }
    useEffect(() => {
        const text = ["Welcome to WhatsApp", "Verify your phone number"]
        setHeading(text[agree - 1])
    }, [agree])
    return (
        <div id="register">
            <div className="container">
                {agree == 1 &&
                    <>
                        <h1 className="head1">{heading}</h1>
                        <div className="img">
                        </div>
                        <ButtonPr title="AGREE AND CONTINUE" click={handleClick} />
                    </>
                }
                {
                    agree == 2 && (
                        (
                            <>
                                <h1 className="head1">{heading}</h1>
                                <div className="phone-number">
                                    <p className="info">WhatsApp will send an SMS message to verify your phone number.
                                        Enter your country code and phone number.
                                    </p>
                                    <div className="country">
                                        <SelectField data={["india", "UAE"]} value="india" change={handlecountryChange} />
                                    </div>
                                    <div className="number-section">
                                        <div className="country-code">
                                            <SelectField data={["+91", "+97"]} newValue={countryCode} value={countryCode} />
                                        </div>
                                        <div className="number">
                                            <TextField id="phone"
                                                style={{ width: "100%" }}
                                                label="phone number"
                                                value={phone}
                                                onChange={PhoneChange}
                                                variant="standard"
                                                inputProps={{ maxLength: 10 }} />
                                        </div>
                                    </div>
                                </div>
                                <ButtonPr title="NEXT" click={handleNext} />
                            </>

                        )
                    )
                }
                {agree == 3 &&
                    (<div className="otp-verification" >
                        {/* <div className="digit-otp" contentEditable></div>
                        <div className="digit-otp" contentEditable></div>
                        <div className="digit-otp" contentEditable></div>
                        <div className="digit-otp" contentEditable></div> */}
                        <div className="spacebw">
                            <TextField id="otp"
                                onChange={otpChange}
                                value={otp}
                                style={{ width: "100%" }}
                                variant="outlined" />
                            <ButtonPr title="VERIFY" click={handleVerify} />
                        </div>

                    </div>
                    )}
            </div>
        </div>
    )
}
