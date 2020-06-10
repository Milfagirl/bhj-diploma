//import { request } from "express";

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = options  => {
    let string = options.url
    let formData
    //метод GET
    if (options.method == 'GET') {
        //Если data не пуст
        if (options.hasOwnProperty('data')) {
            string += '?'
            for (let key in options.data) {
                string += `${key}=${options.data[key]}&`
            }
            formData = null
            string = string.slice(0,string.length-1)
          
        }
    } else {
        //метод POST
        formData = new FormData();
        for (let key in options.data) {
            formData.append(key,options.data[key])
        }
        
    }
    let xhr = new XMLHttpRequest()
    xhr.open(options.method, string)
    xhr.withCredentials = true
    // xhr.responseType = 'json'
    //обработчик для callback
    try {
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                // console.log(JSON.parse(xhr.response).success)
                // console.log(JSON.parse(xhr.response).error)
                options.callback(null, JSON.parse(xhr.response))
                // return xhr.response
            }
            // xhr.send(formData)
        })
        xhr.send(formData)
    } catch (e) {
        // перехват сетевой ошибки
        options.callback(e);
    }
}




//пример для проверки 
// const xhr = createRequest({
//     url: 'user/login',
//     data: {
//         mail: 'ivan@biz.pro',
//         password: 'odinodin'
//     },
//     method: 'POST',
//     callback: (err, response) => {
//         console.log('Ошибка, если есть: ', err);
//         console.log('Данные, если нет ошибки: ', response);
//     }
// });

// const xhr = createRequest({
//     url: 'user/register',
//     data: {
//         mail: 'ivan@biz.pro',
//         password: 'odinodin'
//     },
//     method: 'POST',
// });
