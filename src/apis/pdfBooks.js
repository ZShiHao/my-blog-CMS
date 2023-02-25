import client from "@/config/api";
import * as queryString from "querystring";

const path='/pdfbooks'

async function getPdfBooks(page,pageSize,category){
    try {
        const res=await client.get(path,{
            params:{
                category,
                page,
                pageSize
            }
        })
        return res
    } catch (e) {
        return e
    }
}

async function getBookDownloadUrl(id){
    const res=await client.get(path+'/'+id)
    return res
}

async function uploadPdfBook(id){
        const res=await client.put(path+'/upload/'+`${id}`)
        return res
}

async function updateBookStatus(id){
    try {
        const res=await client.post(path+'/status/'+`${id}`)
        return res
    } catch (e) {
        return e
    }
}

async function deleteBook(id){
        const res=await client.delete(path+'/'+id)
        return res
}

export {
    getPdfBooks,
    uploadPdfBook,
    updateBookStatus,
    deleteBook,
    getBookDownloadUrl

}