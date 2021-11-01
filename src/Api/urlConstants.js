const prod = "https://whatsapp-server.herokuapp.com";
const local = "localhost:3400"

export const getBaseUrl = () => {
    const { hostname } = document.location
    const baseUrl = (hostname === 'localhost') ? local : prod;
    // return baseUrl
    return prod
}

// export const baseUrl = "https://whatsapp-server.herokuapp.com";


export const endpoints = {
    register: "/user/register",
    verify: "/user/verify",
    sendMsg: "/user/send-msg",
    getMsg: "/user/get-msg",
    getRecent: "/user/getrecent",
    getcontacts: "/user/getcontacts",
}
