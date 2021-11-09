import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';


export default function TemporaryDrawer({ value, setVal, anchor = "left", children }) {
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    useEffect(() => {
        setState({ ...state, [anchor]: value })
    }, [value])

    useEffect(() => {
        setVal(state[anchor])
    }, [state])

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown') {
            return;
        }
        console.log("toggleDrawer::Close", event);

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300, height: '100%' }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {/* <Component /> */}
            {children}
        </Box>
    );

    return (
        <div>
            <React.Fragment key={anchor}>
                <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                >
                    {/* {children} */}
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
