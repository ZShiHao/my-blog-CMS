<script setup>
import {onMounted, reactive, ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {getPdfBooks,uploadPdfBook,updateBookStatus,deleteBook} from '@/apis/pdfBooks'
import {getCategory} from '@/apis/category'
import {Delete,Edit,Download,Setting,DocumentAdd,Search,Refresh,Upload} from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import UploadButton from './Components/UploadButton.vue'
import DownloadButton from './Components/DownloadButton.vue'

import {getBookCategories} from "@/apis/bookCategory";
import moment from 'moment'

const books=ref([]) //电子书
const categories = ref([])
const selectionRows=ref([])

// 当前的页面状态
const currentPage=ref(1)
const currentCategory=ref('')
const totalCount=ref(0)


async function handleSelectionChange(row) {
 selectionRows.value.push(row)
 console.log(selectionRows.value);
}

async function handleStatusChange(book){
  try {
    const res=await updateBookStatus(book.id)
    if (res.data.code===200){
      await getBooksByCategory(currentPage.value,currentCategory.value)
    }
  } catch (e) {
    console.log(e)
  }
}

async function handleDeleteBook(book){
  try {
    await ElMessageBox.confirm(
        'Do you want to delete this book? ',
        'Waring',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
    )
    const res=await deleteBook(book.id)
    if (res.data.code===200){
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
      await getBooksByCategory(currentPage.value,currentCategory.value)
    }else {
      ElMessage({
        type: 'error',
        message: res.data.message,
      })
    }
  } catch (e) {
    ElMessage({
      type: 'error',
      message: e.message,
    })
  }
}

async function batchUpload(){
  try {
    if(selectionRows.value.length!==0){

    }else {
      ElMessage({
        type:'warning',
        message:'请选择至少一本书上传'
      })
    }
  } catch (e) {

  }
}

async function loadNewPage(page){
  const res=await getPdfBooks(page,'')
  const body=res.data
  books.value=body.data.books
}

async function getBooksByCategory(page,category){
  currentCategory.value=category
  const res=await getPdfBooks(page,category )
  const body=res.data
  books.value=body.data.books
  totalCount.value=body.data.totalCount
}

onMounted(async ()=>{
  const res=await getPdfBooks(1,'')
  const categoryRes=await getBookCategories(1)
  const body=res.data
  books.value=body.data.books
  totalCount.value=body.data.totalCount

  categories.value=categoryRes.data.data.categories
})
</script>



<template>
  <div>
<!--    <header>-->
<!--      <el-input-->
<!--          v-model="searchText"-->
<!--          class="w-50 m-2"-->
<!--          size="large"-->
<!--          placeholder="Please Input"-->
<!--          :prefix-icon="Search"-->
<!--          @keyup.enter="searchBookByTitle"-->
<!--      />-->
<!--      <el-button type="success" :icon="Refresh" @click="refreshBookTable"></el-button>-->
<!--    </header>-->
    <section>
      <div style="padding-top: 5px" v-for="(category,index) in categories" :key="index">
        <span style="display: inline-block;width: 100px">{{category.name}} :</span>
        <div style="display: inline-block">
          <span  class="subcategory" v-for="(subcategory,index) in category.keys" :key="index" @click="getBooksByCategory(1,subcategory.name)">
            {{subcategory.name}}
          </span>
        </div>
      </div>
    </section>
    <section style="margin:20px 0px">
      <el-button type="primary" disabled @click="batchUpload">Batch Upload</el-button>
    </section>
    <section>
      <el-table :data="books" @selection-change="handleSelectionChange">
        <el-table-column :selectable="row=>!row.uploaded" type="selection" width="55" />
        <el-table-column fixed prop="cover" label="Cover">
          <template #default="scope">
            <img :src="scope.row.coverUrl" style="width: 112px;height: 148px" alt="cover">
          </template>
        </el-table-column>
        <el-table-column  prop="title" label="Title" width="200" />
        <el-table-column sortable prop="published" label="Published" width="110" >
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
            {{scope.row.pages?scope.row.pages:' - '+'Pages'}}
          </template>
        </el-table-column>
        <el-table-column sortable :sort-method="(a,b)=>parseFloat(a)-parseFloat(b)" prop="size" label="BookSize"  />
        <el-table-column fixed="right" label="Operations" >
          <template #default="scope">
            <DownloadButton :book="scope.row"/>
            <UploadButton :book="scope.row" v-model:uploaded="scope.row.uploaded" />
            <el-button type="danger" :icon="Delete" @click="handleDeleteBook(scope.row)" circle />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          :page-size="20"
          :pager-count="11"
          layout="prev, pager, next"
          :total="totalCount"
          @current-change="loadNewPage"
      />
    </section>
<!--    <el-dialog v-model="dialogVisible" title="Book Setting" width="30%" draggable>-->
<!--      <div class="form_outer">-->
<!--        <el-form ref="formRef">-->
<!--          <el-form-item label="Category : ">-->
<!--            <el-select v-model="form.category" placeholder="Select">-->
<!--              <el-option-group-->
<!--                  v-for="group in category"-->
<!--                  :key="group.name"-->
<!--                  :label="group.name"-->
<!--              >-->
<!--                <el-option-->
<!--                    v-for="item in group.keys"-->
<!--                    :key="item"-->
<!--                    :label="item"-->
<!--                    :value="item"-->
<!--                />-->
<!--              </el-option-group>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="Language : ">-->
<!--            <el-select v-model="form.language" placeholder="Please select blog categoty">-->
<!--              <el-option v-for="item in [{name:'中文',value:0},{name:'英文',value:1}]" :label="item.name" :value="item.value"/>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="Active Book: " >-->
<!--            <el-switch v-model="form.activeStatus" />-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->
<!--      <template #footer>-->
<!--      <span class="dialog-footer">-->
<!--        <el-button @click="dialogVisible = false">Cancel</el-button>-->
<!--        <el-button type="primary" @click="submitSetting">-->
<!--          Confirm-->
<!--        </el-button>-->
<!--      </span>-->
<!--      </template>-->
<!--    </el-dialog>-->
  </div>
</template>



<style scoped>
.subcategory{
  cursor: pointer;
  color: cornflowerblue;
  padding: 0 15px;
  /*border-right: 0.5px solid black;*/
}
</style>