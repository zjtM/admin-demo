import $http from "@/plugins/axios.js"

export function Login(data){
    return $http({
        url: '/login',
        method: 'post',
        data
    })
}

export function getMenu(params){
    return $http({
        url:'/menus',
        method:'get',
        params
    })
}