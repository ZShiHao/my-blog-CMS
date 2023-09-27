<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import {
  Document,
  House,
  Reading,
  Guide,
  UserFilled,
  User,
} from "@element-plus/icons-vue";
import { logout } from "@/apis/user";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const suggestions = ref(["zhang", "shi", "hao"]);
const router = useRouter();

const state = ref("");
function querySearch(queryString, cb) {
  const result = suggestions.value;
  cb(result);
}

async function logoutHandler() {
  try {
    const res = await logout({
      access_token: window.localStorage.getItem("access_token"),
    });
    if (res.data.code === 200) {
      ElMessage({
        type: "success",
        message: "退出登录",
      });
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("user_info");
      await router.push("/login");
    }
  } catch (e) {}
}

onMounted(() => {});
</script>

<template>
  <div class="h-full">
    <header class="flex justify-end p-3 header">
      <!--          <el-autocomplete-->
      <!--              :fetch-suggestions="querySearch"-->
      <!--              v-model="state"-->
      <!--              placeholder="search"-->
      <!--          >-->
      <!--            <template #suffix>-->
      <!--            </template>-->
      <!--            <template #default="{item}">-->
      <!--              <div>{{item}}</div>-->
      <!--            </template>-->
      <!--          </el-autocomplete>-->
      <el-dropdown>
        <div class="avatar" @click="">
          <el-avatar :icon="UserFilled" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item :icon="User" divided @click="logoutHandler"
              >Log out</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </header>
    <section class="flex h-full main">
      <el-menu class="h-full el-menu-vertical-dem menu">
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
      <section class="w-full p-8 content">
        <router-view></router-view>
      </section>
    </section>
  </div>
</template>

<style scoped>
.header {
  border-bottom: 1px solid rgba(60, 60, 60, 0.12);
  width: 100%;
  position: fixed;
  z-index: 99;
  .avatar {
    cursor: pointer;
  }
}
.main {
  padding-top: 57px;
  .menu {
    position: fixed;
    z-index: 80;
  }
  .content {
    padding-left: 150px;
  }
}
</style>
