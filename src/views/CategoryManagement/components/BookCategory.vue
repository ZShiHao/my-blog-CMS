<script setup>
import {onMounted, ref, nextTick, reactive} from "vue";
import {getBookCategories,addBookSubCategory,deleteBookCategory,deleteBookSubCategory,addBookCategory} from "@/apis/bookCategory";
import {Delete,Plus} from '@element-plus/icons-vue'

//TODO:分析多个同名ref时,vue是如何处理的

const InputRef=ref(null) //数组
const bookCategory=ref([])

const showDelete=ref(false)

const dialogFormVisible=ref(false)
const form=reactive({
  name:'',
  keys:''
})
const formLabelWidth='140px'

// 添加子分类时三个有关的状态
const newSubCategoryVisible=ref(false)
const newSubCategory=ref('')
const currentEditingCategory=ref({})


function showSubCategoryInput(category){
  currentEditingCategory.value=category
  newSubCategoryVisible.value=true
  nextTick(() => {
    InputRef.value[0].input.focus()
  })
}

function inputBlur(){
  // 添加子分类失去焦点时,清空所有相关的状态
  newSubCategory.value=''
  currentEditingCategory.value=null
  newSubCategoryVisible.value=false
}

async function deleteSubCategory(category,key,index){
  try {
    const res=await deleteBookSubCategory(category._id,key.name)
    bookCategory.value[index]=res.data
  } catch (e) {

  }
}

async function deleteCategory(category){
  try {
    const res=await deleteBookCategory(category._id)
    bookCategory.value=res.data
  } catch (e) {

  }
}

async function submitNewCategory(){
  try {
    const res=await addBookCategory({name:form.name,keys: {name:form.keys}})
    bookCategory.value=res.data
    dialogFormVisible.value=false
  } catch (e) {

  }
}

async function submitNewSubCategory(index){
  try {
    const res=await addBookSubCategory(currentEditingCategory.value._id,newSubCategory.value)
    bookCategory.value[index]=res.data
  } catch (e) {

  } finally {
    // 调用完添加接口后,不管是否成功,让当前的输入失去焦点,为了清空三个状态
    InputRef.value[0].input.blur()
  }
}

onMounted(async ()=>{
  const bookCateRes=await getBookCategories()
  bookCategory.value=bookCateRes.data

})
</script>

<template>
  <section>
    <h1 class="font-bold">
      Book Category
    </h1>
    <el-divider />
    <el-button type="primary" :icon="Plus" @click="dialogFormVisible=true"></el-button>
    <div class="categoryBox" v-for="(category,index) in bookCategory" @pointerleave="currentEditingCategory={}" @pointerenter="currentEditingCategory=category">
      <span>{{category.name+' : '}}</span>
      <el-tag
          v-for="key in category.keys"
          :key="key.name"
          :type="key.name"
          class="mx-1"
          effect="plain"
          @close="deleteSubCategory(category,key,index)"
          closable
      >
        {{ key.name }}
      </el-tag>
      <el-input
          v-if="newSubCategoryVisible&&currentEditingCategory._id===category._id"
          ref="InputRef"
          v-model="newSubCategory"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="submitNewSubCategory(index)"
          @blur="inputBlur"
      />
      <el-button v-else class="button-new-tag ml-1" size="small" @click="showSubCategoryInput(category)">
        + New SubCategory
      </el-button>
      <el-button type="danger" size="small" v-show="currentEditingCategory._id===category._id" :icon="Delete" @click="deleteCategory(category)"></el-button>
    </div>
    <el-dialog v-model="dialogFormVisible" title="Add Category">
      <el-form :model="form">
        <el-form-item label="Category" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Subcategory" :label-width="formLabelWidth">
          <el-input v-model="form.keys" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitNewCategory">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>
  </section>
</template>

<style scoped>
.categoryBox{
  margin-top: 10px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>