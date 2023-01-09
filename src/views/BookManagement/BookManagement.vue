<script setup>
import {onMounted, reactive, ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {getBooks,deleteBook,changeBookStatus,downloadBook,settingBook,getBook} from "@/apis/books";
import {Delete,Edit,Download,Setting,DocumentAdd,Search,Refresh} from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import {getBookCategories} from "@/apis/bookCategory";
import moment from 'moment'

const router=useRouter()

const searchText=ref('')

const books=ref([]) //电子书
const dowloadUrl=ref('') //电子书oss下载地址
const download=ref(null) //a标签
const dialogVisible=ref(false)
const category=ref([]) //图书分类
const currentRow=ref(null)
const form=reactive({
  category:'',
  activeStatus:true,
  language:0,
}) // 需要更改的图书属性

async function searchBookByTitle(){
  try {
    const res=await getBooks({title:searchText.value})
    books.value=res.data
  } catch (e) {
    console.log(e)
  }
}

async function refreshBookTable(){
  try {
    searchText.value=''
    const res=await getBooks()
    books.value=res.data
  } catch (e) {
    console.log(e)
  }
}

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

async function showSettingDialog(scope){
  const row=scope.row
  const res=await getBookCategories()
  category.value=res.data
  dialogVisible.value=true
  currentRow.value=scope
  form.category=row.category
  form.activeStatus=row.activeStatus
  form.language=row.language
}

// 提交图书的新设置的数据
async function submitSetting(){
  try {
    const res=await settingBook(currentRow.value.row._id,form)
    dialogVisible.value=false
    books.value[currentRow.value.$index]=res.data //刷新单行数据
    return res
  } catch (e) {
    return e
  }
}

onMounted(async ()=>{
  const res=await getBooks()
  books.value=res.data
})
</script>

<template>
  <div>
    <header>
      <el-input
          v-model="searchText"
          class="w-50 m-2"
          size="large"
          placeholder="Please Input"
          :prefix-icon="Search"
          @keyup.enter="searchBookByTitle"
      />
      <el-button type="success" :icon="Refresh" @click="refreshBookTable"></el-button>
      <el-button type="primary" :icon="DocumentAdd" @click="router.push('/books/addBook')"></el-button>
    </header>
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
            <el-button type="success" :icon="Setting" @click="showSettingDialog(scope)" circle />
            <el-button type="danger" :icon="Delete" @click="handleDeleteBlog(scope.row)" circle />
          </template>
        </el-table-column>
      </el-table>
    </section>
    <el-dialog v-model="dialogVisible" title="Book Setting" width="30%" draggable>
      <div class="form_outer">
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
                    :key="item"
                    :label="item"
                    :value="item"
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
        </el-form>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitSetting">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.form_outer{
  margin: auto 100px;
}

.el-input{
  width: 300px;
}


</style>