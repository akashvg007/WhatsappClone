import React from 'react';
import { IconButton } from '@mui/material';
export default function IconWrapper({ Component, click }) {
    return (
        <div className="icon">
            <IconButton onClick={click}>
                <Component />
            </IconButton>
        </div>
    )
}
