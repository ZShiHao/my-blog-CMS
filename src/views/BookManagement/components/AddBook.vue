<script setup>
import {reactive,ref,onMounted} from "vue";
import { useRouter, useRoute } from 'vue-router'
import { UploadFilled,Delete, Download, Plus, ZoomIn ,ArrowRight} from '@element-plus/icons-vue'
import {getBookCategories, getBookCategory} from "@/apis/bookCategory";
import {uploadBook} from "@/apis/books";

const router=useRouter()
const route=useRoute()

const form=reactive({
  category:'',
  activeStatus:true,
  language:0,
  bookFile:[]
})

const formRef=ref()
const category=ref([])

function handleUploadProgress(pe){
  console.log(pe)
}

async function submitForm(formRef){
  let formdata=new FormData()
  // 将对象转换成FormData格式的数据
  for (const item in form){
    if (item==='bookFile'){
      formdata.append(item,form[item][0].raw)
    }else {
      formdata.append(item,form[item])
    }
  }
  const res=await uploadBook(formdata,handleUploadProgress)
  await router.push('/books')
}


onMounted(async ()=>{
  const res=await getBookCategories(0)
  category.value=res.data.data.categories
})

</script>

<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/books' }">Book Management</el-breadcrumb-item>
      <el-breadcrumb-item>Upload Book</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="formRef">
      <el-form-item label="Category : ">
        <el-select v-model="form.category" placeholder="Select">
          <el-option-group
              v-for="group in category"
              :key="group.name"
              :label="group.name"
          >
            <el-option
                v-for="item in group.keys"
                :key="item.name"
                :label="item.name"
                :value="item.name"
            />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="Language : ">
        <el-select v-model="form.language" placeholder="Please select blog categoty">
          <el-option v-for="item in [{name:'中文',value:0},{name:'英文',value:1}]" :label="item.name" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="Active Book: " >
        <el-switch v-model="form.activeStatus" />
      </el-form-item>
      <el-form-item label="Book File : ">
        <el-upload
            class="upload-demo"
            drag
            accept=".pdf"
            :auto-upload="false"
            v-model:file-list="form.bookFile"
            :limit="1"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text w-96">
            Drop MarkDown file here or <em>click to upload</em>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>