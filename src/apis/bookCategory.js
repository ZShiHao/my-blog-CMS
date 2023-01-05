import client from "@/config/api";

const path='/book_category'

async function getBookCategory(){
    try{
        const res=await client.get(path)
        return res
    }catch(e){

    }
}


export {
    getBookCategory
}
