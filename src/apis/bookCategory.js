import client from "@/config/api";
import {data} from "autoprefixer";

const path='/book_category'

async function getBookCategories(){
    try{
        const res=await client.get(path)
        return res
    }catch(e){

    }
}

async function getBookCategory(id){
    try {
        const res=await client.get(path+'/'+id)
        return res
    } catch (e) {
        return e
    }
}

async function addBookCategory(data){
    try {
        const res=await client.post(path,data)
        return res
    } catch (e) {
        return e
    }
}

async function addBookSubCategory(id,key){
    try {
        const res=await client.put(path+'/'+id,{key})
        return res
    } catch (e) {
        return e
    }
}

async function deleteBookSubCategory(id,key){
    try {
        const res=await client.delete(path+'/'+id+`?key=${key}`)
        return res
    } catch (e) {
        return e
    }
}

async function deleteBookCategory(id){
    try {
        const res=await client.delete(path+'/'+id)
        return res
    } catch (e) {
        return e
    }
}


export {
    getBookCategories,
    addBookSubCategory,
    getBookCategory,
    deleteBookSubCategory,
    addBookCategory,
    deleteBookCategory
}
