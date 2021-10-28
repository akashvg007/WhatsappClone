export const data = [
    {
        id: 1,
        name: "Akash",
        photo: "pp.jpg",
        lastMsg: "Hi all",
        status: 2,
        time: "10.20 pm"
    },
    {
        id: 2,
        name: "Abu",
        photo: "pp.jpg",
        lastMsg: "Hi Akash",
        status: 1,
        time: "10.20 pm"
    },
    {
        id: 3,
        name: "Avani",
        photo: "pp.jpg",
        lastMsg: "Hi Akash",
        status: 2,
        time: "10.20 pm"
    },
    {
        id: 4,
        name: "Ragni",
        photo: "pp.jpg",
        lastMsg: "Hi Akash",
        status: 1,
        time: "10.20 pm"
    },
    {
        id: 5,
        name: "Aarya",
        photo: "pp.jpg",
        lastMsg: "Hi Akash",
        status: 2,
        time: "10.20 pm"
    },
    {
        id: 6,
        name: "Gowthami",
        photo: "pp.jpg",
        lastMsg: "Hi Akash",
        status: 2,
        time: "10.20 pm"
    },
    {
        id: 7,
        name: "Akash",
        photo: "pp.jpg",
        lastMsg: "Hi all",
        status: 2,
        time: "10.20 pm"
    },
    {
        id: 8,
        name: "Abu",
        photo: "pp.jpg",
        lastMsg: "Hi Akash",
        status: 1,
        time: "10.20 pm"
    },
    {
        id: 9,
        name: "Avani",
        photo: "pp.jpg",
        lastMsg: "Hi Akash",
        status: 2,
        time: "10.20 pm"
    },
    {
        id: 10,
        name: "Ragni",
        photo: "pp.jpg",
        lastMsg: "Hi Akash",
        status: 1,
        time: "10.20 pm"
    }
]

export const chats = [
    {
        msg: "Hi Akash",
        mclass: "left-side",
        class: "bg-white"
    },
    {
        msg: "Hi Yaar",
        mclass: "right-side",
        class: "bg-chat"
    },
    {
        msg: "How are you?",
        mclass: "left-side",
        class: "bg-white"
    },
    {
        msg: "I'm good, How are you?",
        mclass: "right-side",
        class: "bg-chat"
    },
    {
        msg: "I'm also good, what are you doing?",
        mclass: "left-side",
        class: "bg-white"
    },
    {
        msg: `I am working on this whatsapp clone.
            Its not an easy task yaar, had to work all night`,
        mclass: "right-side",
        class: "bg-chat"
    },
    {
        msg: "ok yaar, carry on with your work",
        mclass: "left-side",
        class: "bg-white"
    },
    {
        msg: "and don't forget that you have stand up at 9am",
        mclass: "left-side",
        class: "bg-white"
    },
    {
        msg: "i know yaar, I'll sleep now",
        mclass: "right-side",
        class: "bg-chat"
    },
    {
        msg: "need to fix one more bug",
        mclass: "right-side",
        class: "bg-chat"
    },
    {
        msg: "ok take care yaar",
        mclass: "left-side",
        class: "bg-white"
    },
    {
        msg: "Good night",
        mclass: "right-side",
        class: "bg-chat"
    },
    {
        msg: "ok good night",
        mclass: "left-side",
        class: "bg-white"
    }
]
export const getChats = () => {
    // return chats;
    return [].concat(chats).reverse();
}