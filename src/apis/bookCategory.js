import client from "@/config/api";
import {data} from "autoprefixer";

const path='/book_category'

async function getBookCategories(type){
    try{
        const res=await client.get(path+'/'+`?type=${type}`)
        return res
    }catch(e){

    }
}

async function getBookCategory(type,id){
    try {
        const res=await client.get(path+'/'+id+`?type=${type}`)
        return res
    } catch (e) {
        return e
    }
}

async function addBookCategory(type,data){
    try {
        const res=await client.post(path+`?type=${type}`,data)
        return res
    } catch (e) {
        return e
    }
}

async function addBookSubCategory(type,id,key){
    try {
        const res=await client.put(path+'/'+id+`?type=${type}`,{key})
        return res
    } catch (e) {
        return e
    }
}

async function deleteBookSubCategory(type,id,key){
    try {
        const res=await client.delete(path+'/'+id+`?key=${key}&type=${type}`)
        return res
    } catch (e) {
        return e
    }
}

async function deleteBookCategory(type,id){
    try {
        const res=await client.delete(path+'/'+id+`?type=${type}`)
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
