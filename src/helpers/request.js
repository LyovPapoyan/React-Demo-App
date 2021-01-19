import {getJWT} from './auth';

function request(url, method='GET', body){
    const config = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${getJWT()}`
        }
    };

    if(body){
        config.body = JSON.stringify(body)
    }

    return fetch(url, config)
        .then(response => response.json())
        .then(result => {
            if (result.error) throw result.error; 
            return result;
        })
}


export default request;