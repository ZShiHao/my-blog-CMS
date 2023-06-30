import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";

const client=axios.create({
    baseURL:'http://localhost:3000',
})

client.interceptors.request.use(config=>{
    if (config.url==='/user/register'||config.url==='/user/login'){
        return config
    }else{
        let token=window.localStorage.getItem('access_token')
        if (token){
            config.headers['Authorization']='Bearer '+token
        }
        return config
    }
})

client.interceptors.response.use(response=>{
    if(response.data.code===401){
        // 401的状态码统一拦截处理
        ElMessage({
            type:'error',
            message:response.data.message
        })
        // router.push('/login') //跳转登录界面
    }
})

export default client