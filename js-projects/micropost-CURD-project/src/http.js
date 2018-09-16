/**
 * EasyHTTP Library
 * Library for making HTTP request
 * 
 * @version 3.0.0
 * @author Brad traversy and Shajal kumer
 * @license MIT
 * 
 **/

class EasyHTTP {

    async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    }
    // Make a HTTP POST Request
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        return resData;
    }
    // Make a HTTP PUT Request
    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }

    //  Make a HTTP Delete Request
    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const resData = await 'User deleted';
        return resData;
    }
}

export const http = new EasyHTTP();
