<script setup>
import {Download} from "@element-plus/icons-vue"
import {ref} from "vue";
import {getBookDownloadUrl} from "@/apis/pdfBooks";
import {ElMessage} from "element-plus";

const props=defineProps(['book'])

const download=ref(null) //a标签
const url=ref('')
const loading=ref(false)


async function handleDownloadBook(){
  try {
    loading.value=true
    const {data}=await getBookDownloadUrl(props.book.id)
    if(data.code===200){
      url.value=data.data.url
      loading.value=false
      download.value.click()
    }else {
      loading.value=false
      ElMessage({
        type: 'error',
        message: data.message,
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
    <a ref="download" :href="url" download target="_self"></a>
    <el-button type="primary" :icon="Download" :loading="loading" @click="handleDownloadBook" circle />
</template>

<style scoped>

</style>