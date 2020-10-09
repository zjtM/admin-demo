<template>
<div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="角色" prop="roleName"></el-table-column>
    <el-table-column style="width: 30%" label="描述" prop="roleDesc"></el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button type="text" @click="handleClick(scope.row)">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>


  <el-dialog :visible="visible">
      <el-table :data="rights" @cel-click='test'>
        <el-table-column label="模块" prop="authName"></el-table-column>
      </el-table>

      <el-table :data="right"></el-table>
  </el-dialog>
</div>

</template>

<script>
import { roles } from "@/api/index.js";
export default {
    name:'Roles',
  components: {},
  data() {
    return {
      tableData: [],
      visible:false,
      rights:[],
      right:[]
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    async getRoles() {
      let { data: res } = await roles();
      this.tableData = res.data;
    },
    handleClick(row) {
        this.rights = row.children
        this.visible =true
    },
    test(){
        console.log(this.$children);
        
    }
  },
};
</script>

<style>
</style>
