<script setup>
import {onMounted, ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {getBooks,deleteBook,changeBookStatus,downloadBook} from "@/apis/books";
import {Delete,Edit,Download,Setting} from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import moment from 'moment'

const books=ref([])
const dowloadUrl=ref('')
const router=useRouter()
const download=ref(null)
async function handleStatusChange(row){
  const res=await changeBookStatus(row)
}

async function handleDownloadBook(row){
  try {
    const res=await downloadBook(row._id)
    dowloadUrl.value=res.data
    download.value.click()
  } catch (e) {
    return e
  }
}

async function handleDeleteBlog(row){

  try {
    await ElMessageBox.confirm(
        'Do you want to delete this book ?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
    )
    await deleteBook(row._id)
    ElMessage({
      type: 'success',
      message: 'Delete completed',
    })
    const res=await getBooks()
    books.value=res.data

  }catch (e) {
  }

}

function handleSettingBlog(row){
  router.push(`/blog/settingBlog?id=${row._id}`)
}

onMounted(async ()=>{
  const res=await getBooks()
  books.value=res.data
  console.log(res)
})
</script>

<template>
  <div>
    <el-button type="primary" @click="router.push('/books/addBook')">Add</el-button>
    <section>
      <el-table :data="books">
        <el-table-column fixed prop="cover" label="Cover">
          <template #default="scope">
            <img :src="scope.row.cover" style="width: 112px;height: 148px" alt="cover">
          </template>
        </el-table-column>
        <el-table-column  prop="title" label="Title"  />
        <el-table-column prop="createDate" label="Published" >
          <template #default="scope">
            {{ moment(scope.row.createDate).format('YYYY')}}
          </template>
        </el-table-column>
        <el-table-column prop="activeStatus" label="ActiveStatus" width="130">
          <template #default="scope">
            <el-switch class="ml-2"
                       style="--el-switch-on-color: #13ce66;" v-model="scope.row.activeStatus" @change="handleStatusChange(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="Category"  >
          <template #default="scope">
            <el-tag
                :key="scope.row.category"
                :type="scope.row.category"
                class="mx-1"
                effect="light"
                round
            >
              {{ scope.row.category }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="Author"/>
        <el-table-column  prop="downloads" label="Downloads"  />
        <el-table-column  prop="pages" label="Pages">
          <template #default="scope">
            {{scope.row.pages+'页'}}
          </template>
        </el-table-column>
        <el-table-column  prop="size" label="BookSize"  />
        <el-table-column fixed="right" label="Operations" >
          <template #default="scope">
            <a ref="download" :href="dowloadUrl" download></a>
            <el-button type="primary" :icon="Download" @click="handleDownloadBook(scope.row)" circle />
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