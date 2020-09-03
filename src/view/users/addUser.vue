<template>
  <el-dialog title="添加用户信息" :visible.sync="dialogFormVisible" width="40%">
    <el-form :model="userForm" :rules="FormRules" ref="userForm">
      <el-form-item prop="username" label="用户名称" :label-width="formLabelWidth">
        <el-input v-model="userForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="用户密码" :label-width="formLabelWidth">
        <el-input type="password" show-password v-model="userForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="userForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="手机号" :label-width="formLabelWidth">
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
import { addUsers } from "@/api/index.js";
export default {
  props: {
    value: Boolean,
  },
  data() {
    const checkMobile = (rule, value, callback) => {
      let flag = /^1[34578]\d{9}$/.test(value);
      if (!flag) {
        callback(new Error("请输入正确的手机号"));
      }
      callback();
    };
    return {
      // 添加用户信息
      userForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      FormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        email: [{ type: "email", message: "请输入邮箱", trigger: "blur" }],
        // mobile: [{ validator: checkMobile, trigger: "blur" }],
      },
      formLabelWidth: "100px",
      dialogFormVisible: this.value,
    };
  },
  components: {},
  watch: {
    value(val) {
      this.dialogFormVisible = val;
    },
    dialogFormVisible(val) {
      this.$emit("input", val);
    },
  },
  methods: {
    //添加成功
    handleClick() {
      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          let data = Object.assign({},this.userForm);
          let { data: res } = await addUsers(data);
          this.$emit('RefreshTableList')
          this.dialogFormVisible = false
        }
      });
    },
  },
};
</script>

<style>
</style>
