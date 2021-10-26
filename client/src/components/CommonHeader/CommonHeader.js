import React from 'react';
import "./CommonHeader.scss";

export default function LeftContainer({ children }) {
    return (
        <div className="h-container">
            {children}
        </div>
    )
}
