<template>


</template>

<script setup lang="ts">

import {incident} from "../api/qiyu"
import {onMounted, ref, watch} from 'vue';
import {Search} from '@element-plus/icons-vue'
// const form = ref({
//   user_name: '',
//   first_name: '',
//   last_name: '',
//   u_region: '',
//   department: '',
//   companyString: '',
//   managerString: '',
//   email: '',
//   location: '',
//   country: '',
//   phone: '',
//   mobile_phone: '',
//   vip: '',
// });


const loading = ref(false)
const itemloading = ref(false)
const items = ref([{}]);
const itemsBak = ref([{}]);
const searchKeyword = ref('');
let activeNames = [] ;
// 在组件挂载时初始化表单数据
onMounted(() => {
  // 这里可以添加从API获取初始数据的逻辑
  // 示例：模拟从API获取数据
  getList()
})

const getList = async () => {
  loading.value = true
  incident().then(response => {
        items.value = response.data || [];
        itemsBak.value = response.data || [];
        loading.value = false
      }
  )
};
const searchList = async () => {
  activeNames = [];//收起所有展开的面板
  const keyword = searchKeyword.value.toLowerCase();
  items.value = itemsBak.value.filter(item =>
      item.description?.toLowerCase().includes(keyword) ||
      item.short_description?.toLowerCase().includes(keyword)
  );
};

watch(searchKeyword, (newVal) => {
  searchList();
});


const handleCollapseChange = (activeName) => {
  // console.log(activeName);
  // itemloading.value = true;
  //
  // // 找到当前选中的数据
  // const currentItem = itemsBak.value.find(item => item.id === activeName);
  //
  // if (currentItem) {
  //   incidentInfo(currentItem).then(response => {
  //     const updatedData = response.data || {};
  //     Object.assign(currentItem, updatedData); // 将返回的数据赋值给当前条目
  //     itemloading.value = false;
  //   }).catch(() => {
  //     itemloading.value = false;
  //   });
  // } else {
  //   console.error('未找到匹配的条目');
  //   itemloading.value = false;
  // }
};

</script>

<style scoped>
.ticket-collapse {
  font-family: Arial, sans-serif;
  color: #333;
}

.ticket-header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0;
}

.ticket-number {
  font-weight: bold;
  color: #409EFF;
  margin-right: 20px;
  min-width: 120px;
}

.ticket-desc {
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ticket-time {
  color: #909399;
  font-size: 13px;
  min-width: 160px;
  text-align: right;
}

.ticket-details {
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-top: 8px;
  place-items: center;
  display: flex; /* 使用 Flex 布局 */
  justify-content: center; /* 水平居中 */
}

.detail-row {
  display: flex;
  justify-content: space-between; /* 左右对齐 */
  align-items: center;
  margin-bottom: 16px;
}

.detail-col {
  flex: 1;
  padding-right: 5px;
}

.detail-item {
  margin-bottom: 3px;
}

.detail-label {
  font-weight: bold;
  color: #606266;
  text-align: right;
  margin-right: 10px;
  flex: 0 0 150px; /* 固定宽度或根据需要调整 */
}

.detail-value {
  color: #303133;
  text-align: left;
  flex: 1; /* 占据剩余空间 */
}
.description-section {
  border-top: 1px solid #ebeef5;
  padding-top: 16px;
}

.description-item {
  margin-bottom: 16px;
}

.description-label {
  font-weight: bold;
  color: #606266;
  display: block;
  margin-bottom: 8px;
}

.description-content {
  margin: 0;
  padding: 8px 12px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  white-space: pre-line;
}

.no-more {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 20px 0;
  margin-top: 10px;
}

.search-container {
  padding: 15px;
}

.custom-search-input {
  /* 搜索框样式 */

  :deep(.el-input__wrapper) {
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    border: 1px solid #dcdfe6;
    padding: 0 15px;
    height: 40px;

    &:hover {
      border-color: #c0c4cc;
    }

    &:focus-within {
      border-color: #409eff;
      box-shadow: 0 0 0 1px #409eff;
    }
  }

  /* 占位文字样式 */

  :deep(.el-input__inner::placeholder) {
    color: #c0c4cc;
    font-size: 14px;
  }


}
</style>