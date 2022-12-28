<script setup>
import {RouterView} from 'vue-router'
import {onMounted,ref} from 'vue'
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
        <section class="flex h-full">
          <el-menu
              default-active="2"
              class="el-menu-vertical-dem h-full "
          >
            <el-menu-item index="2" class="pr-2" @click="$router.push('/blog')">
              <span>Blog Management</span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><document /></el-icon>
              <span>Navigator Three</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><setting /></el-icon>
              <span>Navigator Four</span>
            </el-menu-item>
          </el-menu>
          <section class="p-8 w-full">
            <router-view></router-view>
          </section>
        </section>
    </div>
</template>

<style scoped>
.header{
  border-bottom: 1px solid rgba(60, 60, 60, 0.12);
}
</style>