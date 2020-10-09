<template>
 <div>
<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>

 </div>
</template>

<script>
import {rights} from "@/api/index.js"
 export default {
   components: {},
   data () {
     return {
         treeData:[],
         defaultProps:{
             label:'authName',
             children:'children',
         }
     }
   },
   created(){
       this.getRights()
   },
 methods: {
     async getRights(){
    //   let  {data : res} = await rights('list')
    //   console.log(res);
      let {data : tree} = await rights('tree')
        this.treeData = tree.data
      console.log('tree', tree);
     },
     handleNodeClick(){
         console.log(1);
     },
 },
 }
</script>

<style>

 
</style>
