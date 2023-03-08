import client from "@/config/api";

export const register=data=>client({
    method:'post',
    url:'/user/register',
    data
})

export const login=data=>client({
    method:'post',
    url:'/user/login',
    data
})

export const logout=data=>client({
    method:'post',
    url:'/user/logout',
    data
})