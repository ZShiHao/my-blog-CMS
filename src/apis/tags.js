import axios from "axios";

const client=axios.create({
    baseURL:'http://localhost:3000',
})

async function getTags(){
    const res=await client.get('/tags')
    return res
}

export  {
    getTags
}