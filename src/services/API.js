
import axios from 'axios';

// key 4cb700c4898a693600ec30cba7e49a99d988f961
//  base url  https://api-ssl.bitly.com/v4/

export const key = '4cb700c4898a693600ec30cba7e49a99d988f961';

const api = axios.create({
    baseURL:'https://api-ssl.bitly.com/v4/',
    headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${key}`
    }
})
export default api;