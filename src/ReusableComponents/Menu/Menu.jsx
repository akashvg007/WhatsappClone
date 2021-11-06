import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function CustomMenu(props) {
    const { anchorEl, menuList = [], handleClose } = props
    const open = Boolean(anchorEl);
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {menuList.map((item) => (
                <MenuItem onClick={item?.handleClick}>{item.title}</MenuItem>
            ))}
        </Menu>
    );
}
