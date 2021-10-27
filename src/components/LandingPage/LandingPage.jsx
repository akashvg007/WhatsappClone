import React from 'react';
import "./LandingPage.scss";
export default function LandingPage() {
    return (
        <div id="landingPage">
            <div className="container-lp">
                <img src="start-img.jpg" alt="logo" />
                <h1>Keep your phone connected</h1>
                <div className="sub-text">
                    WhatsApp connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi.
                </div>
            </div>
        </div>
    )
}
