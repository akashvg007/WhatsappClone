import React from 'react';
import "./CommonHeader.scss";

export default function CommonHeader({ children }) {
    return (
        <div className="h-container">
            {children}
        </div>
    )
}
