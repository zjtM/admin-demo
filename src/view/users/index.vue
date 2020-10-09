<template>
  <div>
    <!-- 添加用户 -->
    <el-form :inline='true'>
      <el-form-item>
      <el-input width="50px"  v-model="input" placeholder="请输入内容"></el-input>

      </el-form-item>
    <el-button type="primary" @click="handleSearch" >查询</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
    </el-form>

    


    <!-- 用户列表 -->
    <el-table :data="userList" stripe style="width: 100%">
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column prop="mg_state" label="是否启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="getState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="mg_state" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handeDel(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- 解决点击页数不高亮数字，需要在总页数加载完成后来判断当前页，所以加v-if判断总页数是否加载完成 -->
    <el-pagination
      background
      :current-page="pageConfig.pagenum"
      :page-sizes="pageConfig.pageSizes"
      :page-size="pageConfig.pageSize"     
      layout="total, sizes, prev, pager, next"
      :total="pageConfig.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-if="pageConfig.total"
    ></el-pagination>

    <!-- 添加用户信息 -->
    <add-user v-model="dialogFormVisible" @RefreshTableList='getUserList'></add-user>
    <!-- 编辑查看用户信息 -->
    <edit-user :userInfo='userInfo' v-model="EditVisible" @editConfirm='editConfirm'></edit-user>
  </div>
</template>

<script>
import { Users, fixUsers, addUsers , userDelete, userDetile} from "@/api/index.js";
import AddUser from './addUser'
import EditUser from './edit'


export default {
  name: "Users",
  components: {AddUser,EditUser},
  data() {
    return {
      userList: [],
      pageConfig: {
        pageSizes:[5, 10, 20],
        query: "",
        pagenum: 1, //当前页码
        pagesize: 10, //每页显示条数
        total: 0,       
      },
      state: true,
      //修改用户状态
      userDate: {
        uId: "",
        state: true,
      },
      input:'',
      userInfo:{},
 
      // 弹出框
      dialogFormVisible:false,
      EditVisible:false

    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      let searchDate = Object.assign({},this.pageConfig);
      this.$delete(searchDate, "total");
      this.$delete(searchDate, "pageSizes");
      let { data: res } = await Users(this.pageConfig);
      this.userList = res.data.users;
      this.pageConfig.total = res.data.total;
      
    },

    //修改分页
    handleCurrentChange(val) {
      this.pageConfig.pagenum = val;
      this.getUserList();
    },
    handleSizeChange(val) {
      this.pageConfig.pagesize = val;
      this.getUserList();
    },


    //修改用户状态
    getState(row) {
      this.userDate.uId = row.id;
      fixUsers(this.userDate)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 查询
    handleSearch(){
      this.pageConfig.query = this.input
      this.pageConfig.pagenum = 1
      this.getUserList()
    },
    //编辑
    async handleEdit(row){
      let {data:res} = await userDetile(row.id)
      this.userInfo = res.data
      this.EditVisible = true
    },
    editConfirm(val){
      this.$message.success(val)
      this.getUserList()
    },
    // 删除
    async handeDel(row){
      let {data : res} = await userDelete(row.id)
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg)
      }else{
        this.$message.success(res.meta.msg)
      }

    }
  },
};
</script>

<style>
</style>
