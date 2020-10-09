<template>
  <el-dialog title="查看用户信息" :visible.sync="dialogFormVisible" width="40%" @open='open'>
    <el-form :model="userForm" ref="userForm">
      <el-form-item prop="username" label="用户名称" >
        <el-input v-model="userForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" >
        <el-input v-model="userForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="手机号" >
        <el-input v-model="userForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleClick">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {userEdit} from "@/api/index.js"
 export default {
     props:{
         value:Boolean,
         userInfo:Object
     },
   data () {
     return {
         dialogFormVisible:false,
         userForm:{}
     }
   },
   components: {

   },
   created(){
       
   },
   watch:{
       value(val){
           this.dialogFormVisible = val
       },
       dialogFormVisible(val){
           this.$emit('input', val)
       }
   },
   methods:{
       open(){
          this.userForm = Object.assign({}, this.userInfo)
       },
       async handleClick(){
           let Edata = Object.assign({}, this.userForm)
           this.$delete(Edata, 'username')
           this.$delete(Edata,'rid')
           console.log('userForm',this.userForm);
           console.log('data',Edata);
           let {data:res} = await userEdit(Edata)
           if (res.meta.status == 200) {
            //    this.$message.success(res.meta.msg)
               this.$emit('editConfirm',res.meta.msg)
               this.dialogFormVisible = false
           } 
           
       }
   }
 }
</script>

<style>

 
</style>
