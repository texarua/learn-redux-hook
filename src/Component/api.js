import axios from 'axios';

export default axios.create({
    baseURL: "http://laravel-api.local/api/"
});

export const urlProductImage = 'http://laravel-api.local/upload/product/';

export const getConfig = (token) => {
    return   {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }
}