// "use strict";

import axios from "axios";
import BaseTool from '../assets/js/BaseTool'
import {Message} from "element-ui"

const server = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})



//request 拦截器

server.interceptors.request.use(
    config => {
        if (sessionStorage.getItem('token')) {
            config.headers.Authorization = JSON.parse(sessionStorage.getItem("token"))
        }
        return config
    },
    error => {
        console.log(error);
        return Promise.reject(error)
    }
)

server.interceptors.response.use(response => {
    // const res = response.data
    // if (res.meta.status == 201 || res.meta.status == 204 || res.meta.status == 200) {
    //     Message.success(res.meta.msg)
    // }else{
    //     Message.error(res.meta.msg)
    // }
    return response
},
    error => {
        console.log(error);
        return Promise.reject(error)
    }
)

export default server
