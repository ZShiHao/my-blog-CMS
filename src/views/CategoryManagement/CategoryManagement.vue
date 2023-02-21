<script setup>
import {onMounted,ref} from "vue";
import {getBookCategories,addBookSubCategory} from "@/apis/bookCategory";
import PDFBookCategory from './components/PDFBookCategory.vue'


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

    <PDFBookCategory />
  </div>
</template>

<style scoped>
.categoryBox{
  margin-top: 10px;
}

</style>