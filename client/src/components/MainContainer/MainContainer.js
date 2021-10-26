import React from 'react';
import Header from "../CommonHeader/CommonHeader";
import "./MainContainer.scss";
import { Search, MoreVert } from '@mui/icons-material';
import CommonIcon from "../CommonIconWrapper/CommonIconWrapper"
export default function MainContainer() {
    const iconArr = [Search, MoreVert];
    return (
        <div id="mainContainer">
            <Header>
                <div className="img">
                    <img src="pp.jpg" alt="profile pic" />
                </div>
                <div className="icons">
                    {
                        iconArr.map(comp => (
                            <CommonIcon Component={comp} />
                        ))
                    }
                </div>
            </Header>
        </div>
    )
}
