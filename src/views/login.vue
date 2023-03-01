<script setup>
import {RouterView} from 'vue-router'
import {defineProps, defineEmits, ref} from 'vue'
import validator from 'validator';
import {ElMessage} from "element-plus";

const register=ref(false)

const user=ref('')
const password=ref('')
const type=ref(2) // 判断是手机号注册还是邮箱注册
const re_password=ref('') //仅校验用,不上传

const validate=ref(false)

// 效验手机号还是邮箱
function validateUser(){
   if(validator.isEmail(user.value)){
      type.value=1
      return true
   }else if(validator.isMobilePhone(user.value,['zh-CN'])){
      type.value=0
      return true
   }else{
      ElMessage({
         type: 'error',
         message: '请输入手机号或者邮箱',
      })
      return false
   }
}

async function loginHandler(){
   try {
      if (validateUser()){
         if (validator.isStrongPassword(password.value)){
            //验证通过

         }else{
            ElMessage({
               type: 'error',
               message: '密码太简单,请重新输入',
            })
         }
      }

   } catch (e) {

   }
}

async function registerHandler(){
   try {
      if (validateUser()){
         if (password.value!==re_password.value){
            ElMessage({
               type: 'error',
               message: '请输入相同的密码',
            })
         }else{
            if (validator.isStrongPassword(password.value)){
               // 验证通过

            }else{
               ElMessage({
                  type: 'error',
                  message: '密码太简单,请重新输入',
               })
            }
         }
      }
   } catch (e) {

   }
}
</script>

<template>
   <section class="contain">
         <form class="form" action="">
            <input class="input" type="text" v-model="user"  placeholder="Mobile Number or Email">
            <input class="input" type="password" v-model="password" placeholder="Password">
            <input class="input" v-show="register" v-model="re_password" type="password" placeholder="Re-Password">
         </form>
         <button v-if="!register"   :class="user.length>=10&&password.length>=8?'button_active':'button_disable'" @click="loginHandler">
            Log in
         </button>
         <button v-else :class="user.length>=10&&password.length>=8&&re_password.length===password.length?'button_active':'button_disable'" @click="registerHandler">
            Sign Up
         </button>
   </section>
   <section v-if="!register" class="subcontain">
         Don't have an account?
      <span class="register" @click="register=true;password='';user='';re_password=''">
         Sign up
      </span>
   </section>
   <section v-else class="subcontain">
      Have have an account?
      <span class="register" @click="register=false;password='';user='';re_password=''">
         Log in
      </span>
   </section>
</template>

<style scoped>
.contain{
   width: 300px;
   margin:0 auto;
   margin-top: 100px;
   padding: 30px;
   border: 1px solid rgb(219,219,219);
   .form{
      display: flex;
      flex-direction: column;
      justify-content: center;
      .input{
         padding: 9px 9px 7px 8px;
         margin-top: 15px;
         outline: none;
         border: 1px solid rgb(219,219,219);
         &:focus{
            border: 1px solid rgb(168,168,168);
         }
      }
   }
   .button_active{
      width: 238px;
      height: 32px;
      margin-top: 20px;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      outline: none;
      border:none;
      cursor: pointer;
      background-color: rgb(0,149,246);
   }
   .button_disable{
      width: 238px;
      height: 32px;
      margin-top: 20px;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      outline: none;
      border:none;
      cursor: pointer;
      background-color: rgb(0,149,246);
      opacity: 0.7;
      pointer-events: none;
   }
}
.subcontain{
   width: 300px;
   margin:0 auto;
   margin-top: 20px;
   padding: 30px;
   border: 1px solid rgb(219,219,219);
   text-align: center;
   .register{
      cursor: pointer;
      color: rgb(0,149,246);
   }
}
</style>