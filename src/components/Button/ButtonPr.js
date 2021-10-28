import React from 'react';
import "./ButtonPr.scss";
export default function ButtonPr(props) {
    const { title, click } = props;
    return (
        <div id="btn-pr" onClick={click}>
            {title}
        </div>
    )
}
