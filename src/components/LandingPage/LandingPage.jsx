import React from 'react';
import "./LandingPage.scss";
import CircularProgress from '@mui/material/CircularProgress';
export default function LandingPage({ loader }) {
    return (
        <div id="landingPage">
            <div className="container-lp">
                <img src="start-img.jpg" alt="logo" />
                <h1>Keep your phone connected</h1>
                <div className="sub-text">
                    WhatsApp connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi.
                </div>
            </div>
            {loader && <div className="main-container-loader">
                <CircularProgress />
            </div>}
        </div>
    )
}
