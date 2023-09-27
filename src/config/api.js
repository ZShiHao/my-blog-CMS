import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";

const client=axios.create({
    baseURL:'http://172.20.9.234',
    withCredentials: true,
})

client.interceptors.request.use(config=>{
    // if (config.url==='/user/register'||config.url==='/user/login'){
    //     return config
    // }else{
    //     let token=window.localStorage.getItem('access_token')
    //     if (token){
    //         config.headers['Authorization']='Bearer '+token
    //     }
    //     return config
    // }
    return config
})

client.interceptors.response.use(response=>{
    console.log(response)
    if(response.data.status!==200||response.data.status!==201){
        // 401的状态码统一拦截处理
        ElMessage({
            type:'error',
            message:response.data.message
        })
        // router.push('/login') //跳转登录界面
    }
    return response.data
})

export default client