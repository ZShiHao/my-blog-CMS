import client from "@/config/api";
import * as queryString from "querystring";

const path='/pdfbooks'

async function getPdfBooks(page,category){
    try {
        const res=await client.get(path,{
            params:{
                category,
                page
            }
        })
        return res
    } catch (e) {
        return e
    }
}

async function uploadPdfBook(id){
    try {
        const res=await client.put(path+'/upload/'+`${id}`)
        return res
    } catch (e) {
        return e
    }
}

async function updateBookStatus(id){
    try {
        const res=await client.post(path+'/status/'+`${id}`)
        return res
    } catch (e) {
        return e
    }
}

export {
    getPdfBooks,
    uploadPdfBook,
    updateBookStatus
}