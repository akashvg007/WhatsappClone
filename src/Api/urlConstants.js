export const baseUrl = "https://whatsapp-server.herokuapp.com";

export const endpoints = {
    register: "/user/register",
    verify: "/user/verify",
    sendMsg: "/user/send-msg",
    getMsg: "/user/get-msg",
    getRecent: "/user/getrecent/:from",
}
