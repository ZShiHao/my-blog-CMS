import axios from "axios";

const client=axios.create({
    baseURL:'http://localhost:3000',
})

async function addNewBlog(data){
    const res=await client.post('/blog/addBlog',data)
    return res
}

async function getCategory(){
    const res=await client.get('/category')
    return res
}

export  {
    addNewBlog,
    getCategory
}