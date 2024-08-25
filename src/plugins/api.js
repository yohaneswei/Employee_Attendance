import axios from 'axios'
import { BEKaryawan } from './data';

export const apiKaryawan = axios.create({
    baseURL: `${BEKaryawan}`,
    timeout: 3000
})

export const getToken = sessionStorage.getItem('token') || null

export const authToken = function () {
    let token = getToken;
    if (token) {
        const cekToken = token;
        let [, payload,] = cekToken.split(".");
        token = JSON.parse(window.atob(payload));
    }
    return token;
};
