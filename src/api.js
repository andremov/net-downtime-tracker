import axios from "axios";

export const API =  axios.create({
    baseURL: 'https://clear-trash-api.herokuapp.com/ping',
    timeout: 2000,
    responseType:'json',
});

export function fetch() {
    return API.get('').then(() => {
        return true;
    }).catch(e => {

        return false;
    })
}
