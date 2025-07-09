<template>
  <el-row class="mb-4" style="justify-content: right;right: 140px">
    <el-button type="primary" :icon="Search" size="mini" @click="handleQuery">搜索</el-button>
  </el-row>
  <el-table :data="tableData" stripe
            v-loading="loading" >
    <el-table-column label="number" prop="number" />
    <el-table-column label="创建人" prop="sys_created_by" />
    <el-table-column label="更新时间" prop="sys_updated_on" />
    <el-table-column label="状态" prop="state" />
    <el-table-column label="影响程度" prop="impact" />
    <el-table-column label="紧急程度" prop="priority" />
    <el-table-column label="简短描述" prop="short_description" />
    <el-table-column label="详细描述" prop="description" />
  </el-table>
</template>

<script lang="ts" setup>

import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
import {incident} from "../api/qiyu"
import { reactive, ref } from 'vue'
import { onMounted } from 'vue'
const tableData =   ref([]);
// 查询参数
const queryParams =  reactive({
  pageNum: 1,
  pageSize: 10,
  roleName: undefined,
  roleKey: undefined,
  status: undefined
})
const total =  reactive(ref(0))
const loading =  ref(false)
// 页面加载时自动执行
onMounted(() => {
  getList()
})

const getList = async () =>{
  loading.value = true
  incident().then(response => {
        tableData.value = response.data
        // total.value = response.total
        loading.value = false
      }
  )
}
/** 搜索按钮操作 */
const handleQuery = async () =>{
  queryParams.pageNum = 1
  getList()
}
</script>
