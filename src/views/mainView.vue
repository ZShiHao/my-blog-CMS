<script setup>
import {RouterView} from 'vue-router'
import {onMounted,ref} from 'vue'
import {Document,House,Reading,Guide} from "@element-plus/icons-vue";
const suggestions=ref(['zhang','shi','hao'])
const state=ref('')
function querySearch(queryString,cb){
  const result=suggestions.value
  cb(result)
}
onMounted(()=>{

})
</script>

<template>
    <div class="h-full">
        <header class="p-3 flex justify-end  header">
          <el-autocomplete
              :fetch-suggestions="querySearch"
              v-model="state"
              placeholder="search"
          >
            <template #suffix>
            </template>
            <template #default="{item}">
              <div>{{item}}</div>
            </template>
          </el-autocomplete>
        </header>
        <section class="flex h-full main">
          <el-menu
              class="el-menu-vertical-dem h-full menu"
          >
            <el-menu-item index="1" @click="$router.push('/home')">
              <el-icon><House /></el-icon>
              <span>Home</span>
            </el-menu-item>
            <el-menu-item index="2" class="pr-2" @click="$router.push('/blog')">
              <el-icon><Document /></el-icon>
              <span>Blogs</span>
            </el-menu-item>
            <el-menu-item index="3" class="pr-2" @click="$router.push('/books')">
              <el-icon><Reading /></el-icon>
              <span>Books</span>
            </el-menu-item>
            <el-menu-item index="4" class="pr-2" @click="$router.push('/pdfbooks')">
              <el-icon><Reading /></el-icon>
              <span>PDFDriver</span>
            </el-menu-item>
            <el-menu-item index="5" class="pr-2" @click="$router.push('/category')">
              <el-icon><Guide /></el-icon>
              <span>Category</span>
            </el-menu-item>
          </el-menu>
          <section class="p-8 w-full content">
            <router-view></router-view>
          </section>
        </section>
    </div>
</template>

<style   scoped>
.header{
  border-bottom: 1px solid rgba(60, 60, 60, 0.12);
   width: 100%;
   position: fixed;
   z-index: 99;
}
.main{
   padding-top: 57px;
   .menu{
      position: fixed;
      z-index: 80;
   }
   .content{
      padding-left: 150px;
   }
}
</style>