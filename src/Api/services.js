import axios from 'axios';
import { getBaseUrl, endpoints } from "./urlConstants";

const baseUrl = getBaseUrl();
const commonGet = async (url) => {
    try {
        const token = localStorage.getItem("token")
        let resp;
        if (token) {
            resp = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } });
        }
        else resp = await axios.get(url);
        if (resp.status == 200)
            return resp?.data.data;
    }
    catch (err) {
        console.log("something went wrong::commonGet", err.message);
    }
}

const commonPost = async (url, payload) => {
    try {
        const token = localStorage.getItem("token")
        let resp;
        if (token) {
            resp = await axios.post(url, payload, { headers: { "Authorization": `Bearer ${token}` } });
        }
        else resp = await axios.post(url, payload);
        if (resp.status == 200)
            return resp?.data.data;
    }
    catch (err) {
        console.log("something went wrong::commonGet", err.message);
    }
}

export const registerUser = async (payload) => {
    try {
        const url = baseUrl + endpoints.register;
        const result = await commonPost(url, payload);
        return result
    }
    catch (err) {
        console.log("something went wrong", err.message);

    }
}

export const verifyOTP = async (payload) => {
    try {
        const url = baseUrl + endpoints.verify;
        const result = await commonPost(url, payload);
        return result
    }
    catch (err) {
        console.log("something went wrong", err.message);

    }
}

export const getMessageOne = async (payload) => {
    try {
        const url = baseUrl + endpoints.getMsg;
        const result = await commonPost(url, payload);
        return result
    }
    catch (err) {
        console.log("something went wrong", err.message);

    }
}

export const getRecentChats = async () => {
    try {
        const url = baseUrl + endpoints.getRecent;
        const result = await commonGet(url);
        console.log("getRecentChats::result", result);
        return result
    }
    catch (err) {
        console.log("something went wrong", err.message);

    }
}

export const sendMessage = async (payload) => {
    try {
        const url = baseUrl + endpoints.sendMsg;
        const result = await commonPost(url, payload);
        console.log("sendMessage::result", result);
        return result
    }
    catch (err) {
        console.log("something went wrong", err.message);

    }
}

export const getContact = async () => {
    try {
        const url = baseUrl + endpoints.getcontacts;
        const result = await commonGet(url);
        console.log("getContact::result", result);
        return result
    }
    catch (err) {
        console.log("something went wrong", err.message);

    }
}
export const addContact = async (payload) => {
    try {
        const url = baseUrl + endpoints.addcontact;
        const result = await commonPost(url, payload);
        console.log("addContact::result", result);
        return result
    }
    catch (err) {
        console.log("something went wrong", err.message);

    }
}