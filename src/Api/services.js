import axios from 'axios';
import { baseUrl, endpoints } from "./urlConstants";

const commonGet = async (url) => {
    try {
        const resp = await axios.get(url);
        return resp;
    }
    catch (err) {
        console.log("something went wrong::commonGet", err.message);
    }
}

const commonPost = async (url, payload) => {
    try {
        const resp = await axios.post(url, payload);
        return resp;
    }
    catch (err) {
        console.log("something went wrong::commonGet", err.message);
    }
}

export const registerUser = async (payload) => {
    try {
        const url = baseUrl + endpoints.register;
        const result = await commonPost(url, payload);
        console.log("register::result", result);
        return result
    }
    catch (err) {
        console.log("something went wrong", err.message);

    }
}