<script setup>
import {onMounted, reactive, ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {getBooks,deleteBook,changeBookStatus,downloadBook,settingBook,getBook} from "@/apis/books";
import {getPdfBooks} from '@/apis/pdfBooks'
import {Delete,Edit,Download,Setting,DocumentAdd,Search,Refresh} from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import {getBookCategories} from "@/apis/bookCategory";
import moment from 'moment'

const books=ref([]) //电子书

onMounted(async ()=>{
  const res=await getPdfBooks()
  books.value=res.data
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
      <el-table :data="books">
        <el-table-column fixed prop="cover" label="Cover">
          <template #default="scope">
            <img :src="scope.row.coverUrl" style="width: 112px;height: 148px" alt="cover">
          </template>
        </el-table-column>
        <el-table-column  prop="title" label="Title"  />
        <el-table-column prop="published" label="Published" >
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
        <el-table-column  prop="uploaded" label="Uploaded"  />
<!--        <el-table-column fixed="right" label="Operations" >-->
<!--          <template #default="scope">-->
<!--            <a ref="download" :href="dowloadUrl" download target="_blank"></a>-->
<!--            <el-button type="primary" :icon="Download" @click="handleDownloadBook(scope.row)" circle />-->
<!--            <el-button type="success" :icon="Setting" @click="showSettingDialog(scope)" circle />-->
<!--            <el-button type="danger" :icon="Delete" @click="handleDeleteBlog(scope.row)" circle />-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
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

</style>