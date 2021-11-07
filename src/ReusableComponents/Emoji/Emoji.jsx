import React, { useEffect, createElement, useRef, useState } from "react";
import 'emoji-picker-element';

export default function Picker({ getEmoji }) {
    const ref = useRef(null);
    // const [emoji, setEmoji] = useState('')

    useEffect(() => {
        ref.current.addEventListener('emoji-click', event => {
            // console.log('Emoji clicked!', event)
            // console.log('Emoji clicked!', event.detail)
            // setEmoji(event.detail.unicode);
            getEmoji(event.detail)
        })
        ref.current.skinToneEmoji = '👍'
    }, [])

    return createElement('emoji-picker', { ref })
}