import client from "@/config/api";

const path='/pdfbooks'

async function getPdfBooks(){
    try {
        const res=await client.get(path)
        return res

    } catch (e) {
        return e
    }
}

export {
    getPdfBooks
}