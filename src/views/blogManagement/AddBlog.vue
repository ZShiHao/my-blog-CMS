<script setup>
import {reactive,ref,onMounted} from "vue";
import { useRouter, useRoute } from 'vue-router'
import { UploadFilled,Delete, Download, Plus, ZoomIn ,ArrowRight} from '@element-plus/icons-vue'
import {getCategory} from "@/apis/category";
import {addNewBlog} from '@/apis/blogs'

const router=useRouter()
const route=useRoute()

const form=reactive({
  title:'',
  category:'',
  activeStatus:true,
  blog:[],
  cover:[]
})
const formRef=ref()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const category=ref([])


async function submitForm(formRef){
  let formdata=new FormData()
  // 将对象转换成FormData格式的数据
  for (const item in form){
    if (item==='blog'||item==='cover'){
      formdata.append(item,form[item][0].raw)
    }else {
      formdata.append(item,form[item])
    }
  }
  const res=await addNewBlog(formdata)
  await router.push('/blog')
}
const handlePictureCardPreview = (file) => {
      dialogImageUrl.value = file.url
      dialogVisible.value = true
}
const handleRemove = (file) => {
  form.cover=[]
}

onMounted(async ()=>{
  const res=await getCategory()
  category.value=res.data.category
})

</script>

<template>
    <div>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/blog' }">Blog Management</el-breadcrumb-item>
        <el-breadcrumb-item>Add Blog</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form ref="formRef">
        <el-form-item label="Title : ">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="Category : ">
          <el-select v-model="form.category" placeholder="Please select blog categoty">
            <el-option v-for="item in category" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Active Blog: " >
          <el-switch v-model="form.activeStatus" />
        </el-form-item>
        <el-form-item v-if="!route.query.id" label="Blog File : ">
          <el-upload
              class="upload-demo"
              drag
              accept=".md"
              :auto-upload="false"
              v-model:file-list="form.blog"
              :limit="1"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text w-96">
              Drop MarkDown file here or <em>click to upload</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="Blog Cover : ">
          <el-upload :limit="1" action="" accept="image/*" list-type="picture-card" v-model:file-list="form.cover" :auto-upload="false">
            <el-icon><Plus /></el-icon>
            <template #file="{ file }">
              <div>
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions"><span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
                >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
        </el-form-item>
      </el-form>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
</template>

<style scoped>

</style>