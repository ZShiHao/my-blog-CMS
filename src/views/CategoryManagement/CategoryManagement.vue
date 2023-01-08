<script setup>
import {onMounted,ref} from "vue";
import {getBookCategories,addBookSubCategory} from "@/apis/bookCategory";
import BookCategory from './components/BookCategory.vue'


onMounted(async ()=>{

})

</script>

<template>
  <div>
    <section>
      <h1 class="font-bold">
        Blog Category
      </h1>
      <el-divider />
    </section>

    <BookCategory />
  </div>
</template>

<style scoped>
.categoryBox{
  margin-top: 10px;
}

</style>