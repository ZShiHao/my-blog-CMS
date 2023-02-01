import axios from "axios";

const client=axios.create({
    baseURL:'http://localhost:3000',
})

async function getCategory(){
    const res=await client.get('/book_category')
    return res
}

export  {
    getCategory
}