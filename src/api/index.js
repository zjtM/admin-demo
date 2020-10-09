import $http from "@/plugins/axios.js"

//登录
export function Login(data){
    return $http({
        url: '/login',
        method: 'post',
        data
    })
}

// 左侧列表
export function getMenu(params){
    return $http({
        url:'/menus',
        method:'get',
        params
    })
}

// 用户管理
export function Users(params){
    return $http({
        url:'/users',
        method: 'get',
        params
    })
}
// 添加用户
export function addUsers(data){
    return $http({
        url:'/users',
        method:'post',
        data
    })
}
// 修改用户状态
export function fixUsers(params){
    return $http({
        url:`/users/${params.uId}/state/${params.state}`,
        method:'put'
    })
}
// 用户详情
export function userDetile(params){
    return $http({
        url:`/users/${params}`,
        method:'get'
    })
}
//编辑用户信息
export function userEdit(params){
    return $http({
        url:`/users/${params.id}`,
        method:'put',
        params
    })
}
//删除用户
export function userDelete(params){
    return $http({
        url:`/users/${params}`,
        method:'delete'
    })
}
//分配用户角色
export function setRole(params){
    return $http({
        url:`/users/${params.id}`,
        method:'put',
        params
    })
}

//权限列表
export function rights(params){
    return $http({
        url:`rights/${params}`,
        method:'get'
    })
}

// 角色列表
export function roles(){
    return $http({
        url:`/roles`,
        method:'get'
    })
}