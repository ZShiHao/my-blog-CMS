<script setup>
import {onMounted, ref} from 'vue'
import {getBlogList,updateBlogStatus} from "@/apis/blogs";

const blogList=ref([])

async function handleStatusChange(row){
  const res=await updateBlogStatus({_id:row._id,activeStatus:row.activeStatus})
  console.log(res)
}

onMounted(async ()=>{
  console.log(blogList)
  const res=await getBlogList()
  blogList.value=res.data
})
</script>

<template>
    <div>
      <el-button type="primary" @click="$router.push('/blog/addBlog')">Add</el-button>
      <section>
        <el-table :data="blogList">
          <el-table-column fixed prop="title" label="Title"  />
          <el-table-column prop="cover" label="Cover">
            <template #default="scope">
              <img :src="scope.row.cover" style="width: 200px;height: 100px" alt="cover">
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="CreateTime"  />
          <el-table-column prop="activeStatus" label="ActiveStatus" >
            <template #default="scope">
              <el-switch v-model="scope.row.activeStatus" @change="handleStatusChange(scope.row)"/>
            </template>
          </el-table-column>
          <el-table-column prop="tags" label="Tags" />
          <el-table-column prop="category" label="Category"  />
          <el-table-column fixed="right" label="Operations" >
            <template #default>
              <el-button link type="primary" size="small"
              >Detail</el-button
              >
              <el-button link type="primary" size="small">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </div>
</template>

<style scoped>

</style>