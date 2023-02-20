<script setup>
import {defineProps, defineEmits, ref} from 'vue'
import {Upload} from "@element-plus/icons-vue"
import {ElMessage, ElMessageBox} from "element-plus";
import {deleteBook, uploadPdfBook} from "@/apis/pdfBooks";

const props=defineProps(['book','uploaded'])
const emit=defineEmits(['update:uploaded'])

const loading=ref(false)

async function handleUploadBook(){
  try {
    loading.value=true
    const res=await uploadPdfBook(props.book.id)
    if (res.data.code===200){
      loading.value=false
      emit('update:uploaded',true)
      ElMessage({
        type: 'success',
        message: res.data.message,
      })
    }else{
      loading.value=false
      ElMessage({
        type: 'error',
        message: res.data.message,
      })
    }
  } catch (e) {
    loading.value=false
    ElMessage({
      type: 'error',
      message: e.message,
    })
  }
}

</script>

<template>
  <el-button type="success"  color="#626aef" :disabled="uploaded" :loading="loading" :icon="Upload" @click="handleUploadBook" circle />
</template>


<style scoped>

</style>