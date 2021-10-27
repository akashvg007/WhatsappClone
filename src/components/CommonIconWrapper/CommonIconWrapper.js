import React from 'react';
import { IconButton } from '@mui/material';
export default function IconWrapper({ Component }) {
    return (
        <div className="icon">
            <IconButton>
                <Component />
            </IconButton>
        </div>
    )
}
