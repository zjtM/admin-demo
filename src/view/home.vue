<template>

<el-container class='el-container'>
  <!-- 头部 -->
  <el-header class='header'>
    <div class="logo-box">
      <img src="../assets/logo.png" >
    </div>
    <div class="user-box" @click="HangLoginOut">
      退出登录
    </div>

  </el-header>

  <!-- 左边菜单栏 -->
  <el-container class='el-container'>
    <el-aside width="200px" style="background:#000000b8">
      <el-menu
      :router='true'
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu :index="menus.path" v-for="(menus, index) in menuList" :key="index">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{menus.authName}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="menu.path"  v-for="(menu,index) in menus.children" :key="index">{{menu.authName}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>      
      </el-menu>
    </el-aside>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
import {getMenu} from '@/api/index.js'
 export default {
   components: {

   },
   data () {
     return {
       menuList:[]

     }
   },
   created(){
     this.getMenuList()
   },
   methods:{
     async getMenuList(){
       const {data : res} = await getMenu()
       console.log(res);
       this.menuList = res.data
     },

     HangLoginOut(){
       sessionStorage.clear()
       this.$router.push('/login').catch(err=>{console.log(err);})
     }
   }

 }
</script>

<style lang='less' scoped >
  

.el-container{
  height: 100%;
}

.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000000b8;
  .logo-box{
    width: 50px;
    height: 50px;
    img{
      height: 100%;
    }
  }
  .user-box{
    font-size: 16px;
    color: #EEE;
    cursor: pointer;
    &:hover{
      color: burlywood;
    }
  }
}
</style>
