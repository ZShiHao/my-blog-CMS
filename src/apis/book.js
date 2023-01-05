import client from "@/config/api";

const path='/books'


async function uploadBook(formdata,handleUploadProgress){
    try{
        const res=await client.post(path,formdata,{
            onUploadProgress:handleUploadProgress
        })
        return res
    }catch(e){

    }
}

export {
    uploadBook
}
