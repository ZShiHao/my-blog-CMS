<script setup>
import {onMounted, ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {getBlogList,updateBlogStatus,deleteBlog} from "@/apis/blogs";
import {Delete,Edit,Check,Setting} from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from 'element-plus'

const blogList=ref([])
const router=useRouter()
async function handleStatusChange(row){
  const res=await updateBlogStatus({_id:row._id,activeStatus:row.activeStatus})
}

async function handleDeleteBlog(row){

  try {
    await ElMessageBox.confirm(
        'Do you want to delete this blog ?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
    )
    await deleteBlog(row._id)
    ElMessage({
      type: 'success',
      message: 'Delete completed',
    })
    const res=await getBlogList()
    blogList.value=res.data

  }catch (e) {
  }

}

function handleSettingBlog(row){
  router.push(`/blog/settingBlog?id=${row._id}`)
}

onMounted(async ()=>{
  const res=await getBlogList()
  blogList.value=res.data
})
</script>

<template>
  <div>
    <el-button type="primary" @click="router.push('/books/addBook')">Add</el-button>
    <section>
      <el-table :data="blogList">
        <el-table-column fixed prop="title" label="Title"  />
        <el-table-column prop="cover" label="Cover">
          <template #default="scope">
            <img :src="scope.row.cover" style="width: 200px;height: 100px" alt="cover">
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="CreateTime"  />
        <el-table-column prop="activeStatus" label="ActiveStatus" width="150">
          <template #default="scope">
            <el-switch class="ml-2"
                       style="--el-switch-on-color: #13ce66;" v-model="scope.row.activeStatus" @change="handleStatusChange(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="Tags" width="300">
          <template #default="scope">
            <el-tag
                v-for="tag in scope.row.tags"
                :key="tag"
                :type="tag"
                class="mx-1"
                effect="light"
                round
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="Category"  />
        <el-table-column  prop="name" label="FileName"  />
        <el-table-column fixed="right" label="Operations" >
          <template #default="scope">
            <el-button type="primary" :icon="Edit" circle />
            <el-button type="success" :icon="Setting" @click="handleSettingBlog(scope.row)" circle />
            <el-button type="danger" :icon="Delete" @click="handleDeleteBlog(scope.row)" circle />
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<style scoped>

</style>