import client from "@/config/api";

const path='/books'

async function getBooks(){
    try{
     const res=await client.get(path)
     return res
    }catch(e){
        return e
    }
}

async function downloadBook(id){
    try {
        const res=await client.get(path+'/download/'+id)
        return res
    } catch (e) {
        return e
    }
}

async function getBook(id){
    try {
        const res=await client.get(path+'/book/'+id)
        return res
    } catch (e) {
        return e
    }
}

async function deleteBook(id){
    try{
     const res=await client.delete(path+'/'+id)
        return res
    }catch(e){
        return e
    }
}

async function changeBookStatus(book){
    try {
        const res=await client.put(path+'/status/'+book._id,{activeStatus:book.activeStatus})
        return res
    } catch (e) {
        return e
    }
}

async function settingBook(id,data){
    try {
        const res=await client.put(path+'/setting/'+id,data)
        return res
    } catch (e) {
        return e
    }
}

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
    uploadBook,
    getBooks,
    deleteBook,
    changeBookStatus,
    downloadBook,
    settingBook,
    getBook
}
