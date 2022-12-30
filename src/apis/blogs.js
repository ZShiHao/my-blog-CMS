import axios from "axios";
import {data} from "autoprefixer";

const client=axios.create({
    baseURL:'http://localhost:3000',
})

async function addNewBlog(data){
    const res=await client.post('/blog/addBlog',data)
    return res
}

async function deleteBlog(id){
    const res=await client.delete(`/blog/delete?_id=${id}`)
    return res
}

async function getBlogList(){
    const res=await client.get('/blog/list')
    return res
}

async function updateBlogStatus(data){
    const res =await client.post('/blog/status',data)
    return res
}

async function getBlogDetail(id){
    const res=await client.get(`/blog/detail?_id=${id}`)
    return res
}

export  {
    getBlogList,
    addNewBlog,
    updateBlogStatus,
    deleteBlog,
    getBlogDetail
}