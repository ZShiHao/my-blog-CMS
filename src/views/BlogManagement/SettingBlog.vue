<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute, useRouter} from 'vue-router'
import {ArrowRight, Plus} from '@element-plus/icons-vue'
import {getCategory} from "@/apis/category";
import {getBlogDetail, updateBlogSetting} from '@/apis/blogs'
import {getTags} from "@/apis/tags";

const router=useRouter()
const route=useRoute()

const form=reactive({
  title: '',
  category: '',
  tags: [],
  activeStatus: true,
  cover: []
})
const formRef=ref()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const category=ref([])
const tags=ref([])
const blogDetail=ref({})

async function submitForm(formRef){
  let formdata=new FormData()
  // 将对象转换成FormData格式的数据
  for (const item in form){
    if (item==='cover'){
      // 如果是新添加的图片,才需要传cover参数
      if (form[item][0].status==="ready"){
        formdata.append(item,form[item][0].raw)
      }
    }else {
      formdata.append(item,form[item])
    }
  }
  const res=await updateBlogSetting(blogDetail.value._id,formdata)
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
  const tagsRes=await getTags()
  tags.value=tagsRes.data
  const detail=await getBlogDetail(route.query.id)
  blogDetail.value=detail.data
  for(const [key,value] of Object.entries(form)){
    if (key==='cover'){
      form[key].push({name:detail.data.coverName,url:detail.data.cover})
    }else if (key!=='blog'){
      form[key]=detail.data[key]
    }
  }
})

</script>

<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/blog' }">Blog Management</el-breadcrumb-item>
      <el-breadcrumb-item>Setting Blog</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="formRef">
      <el-form-item label="Title : ">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="Category : ">
        <el-select v-model="form.category" placeholder="Please select blog categoty">
          <el-option v-for="item in category" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="Tags : ">
        <el-checkbox-group v-model="form.tags">
          <el-checkbox-button v-for="tag in tags" :key="tag" :label="tag">{{
              tag
            }}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Active Blog: ">
        <el-switch class="ml-2"
                   v-model="form.activeStatus" style="--el-switch-on-color: #13ce66;"/>
      </el-form-item>
      <el-form-item label="Blog Cover : ">
        <el-upload v-model:file-list="form.cover" :auto-upload="false" :limit="1" :on-preview="handlePictureCardPreview"
                   :on-remove="handleRemove" accept="image/*" action="" list-type="picture-card">
          <el-icon>
            <Plus/>
          </el-icon>
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