<template>
  <div>
    <div class="form-header">
      <h3>客户信息</h3>
      <el-button type="primary" @click="createWorkOrder" v-if="createBoo">新建工单</el-button>

    </div>

    <el-form :model="form" label-width="120px" v-loading="loading">
      <el-form-item label="Email">
        <el-input
            v-model="form.email"
            placeholder="请输入关键字搜索"
            class="custom-search-input"
            clearable
            @keyup.enter="searchList"
        >
          <template #suffix>
            <el-icon class="search-icon" @click="searchList">
              <Search/>
            </el-icon>
          </template>
        </el-input>
        <div class="error-message" :style="{ visibility: form.email ? 'hidden' : 'visible' }">
          无法自动获取用户信息，请输入邮箱进行搜索
        </div>
      </el-form-item>

      <!--      <el-form-item label="First name">-->
      <!--        <el-input v-model="form.first_name" disabled placeholder=""/>-->
      <!--      </el-form-item>-->

      <!--      <el-form-item label="Last name">-->
      <!--        <el-input v-model="form.last_name" disabled placeholder=""/>-->
      <!--      </el-form-item>-->

      <el-form-item label="Name">
        <el-input v-model="form.last_name" disabled placeholder=""/>
      </el-form-item>

      <el-form-item label="Title">
        <el-input v-model="form.title" disabled placeholder=""/>
      </el-form-item>

      <!--      <el-form-item label="Region">-->
      <!--        <el-input v-model="form.u_region" disabled placeholder=""/>-->
      <!--      </el-form-item>-->

      <el-form-item label="Department">
        <el-input v-model="form.departmentString" disabled placeholder=""/>
      </el-form-item>

      <!--      <el-form-item label="Company">-->
      <!--        <el-input v-model="form.companyString" disabled placeholder="空"/>-->
      <!--      </el-form-item>-->

      <!--      <el-form-item label="Manager">-->
      <!--        <el-input v-model="form.managerString" disabled placeholder="空"/>-->
      <!--      </el-form-item>-->

      <!--      <el-form-item label="Email">-->
      <!--        <el-input v-model="form.email" disabled placeholder=""/>-->
      <!--      </el-form-item>-->


      <el-form-item label="Location">
        <el-input v-model="form.locationString" disabled placeholder=""/>
      </el-form-item>

      <!--      <el-form-item label="Country">-->
      <!--        <el-input v-model="form.country" disabled placeholder=""/>-->
      <!--      </el-form-item>-->

      <!--      <el-form-item label="Phone">-->
      <!--        <el-input v-model="form.phone" disabled placeholder=""/>-->
      <!--      </el-form-item>-->

      <!--      <el-form-item label="Mobile phone">-->
      <!--        <el-input v-model="form.mobile_phone" disabled placeholder=""/>-->
      <!--      </el-form-item>-->

      <el-form-item label="VIP">
        <el-checkbox v-model="form.vip" :disabled="true"/>
      </el-form-item>
      <el-form-item label="标签">
        <el-tag
            v-for="(tag, index) in tags"
            :key="index"
            type="success"
            class="tag-item"
        >
          {{ tag }}
        </el-tag>
      </el-form-item>
    </el-form>
    <div class="form-header">
      <h3>历史工单</h3>
    </div>
    <div>
      <!-- 搜索框 -->
      <div class="search-container">
        <!-- Element UI 搜索框（图标在右侧） -->
        <el-input
            v-model="searchKeyword"
            placeholder="请输入关键字搜索"
            class="custom-search-input"
            clearable
        >
          <template #suffix>
            <el-icon class="search-icon" @click="searchWorkList">
              <Search/>
            </el-icon>
          </template>
        </el-input>
      </div>

      <div class="ticket-collapse">
        <el-collapse accordion v-model="activeNames" @change="handleCollapseChange">
          <div v-loading="itemloading" class="loading-container">
            <el-collapse-item
                v-for="(item, index) in items"
                :key="item.id"
                :name="item.id"
                class="ticket-item"
            >
              <template #title>
                <div class="ticket-header">
                  <span class="ticket-desc">{{ item.sys_created_on }}</span>
                  <span class="ticket-desc">{{
                      {
                        1: 'New',
                        2: 'Work In Progress',
                        3: 'On Hold',
                        6: 'Resolved',
                        7: 'Closed',
                        11: 'Confirm Resolution'
                      }[item.state] || 'Open'
                    }}</span>
                  <span class="ticket-desc">{{ item.number }}</span>
                  <span class="ticket-desc">{{ item.short_description }}</span>
                </div>
              </template>
              <div class="ticket-details">
                <el-row>
                  <el-col class="detail-row">
                    <span class="detail-label">Number:</span>
                    <span class="detail-value">{{ item.number }}</span>
                  </el-col>
                  <el-col class="detail-row">
                    <span class="detail-label">Caller:</span>
                    <span class="detail-value">{{ item.caller }}</span>
                  </el-col>
                  <el-col class="detail-row">
                    <span class="detail-label">On Behalf Of:</span>
                    <span class="detail-value">{{ item.on_behalf_of }}</span>
                  </el-col>
                  <el-col class="detail-row">
                    <span class="detail-label">Opened:</span>
                    <span class="detail-value">{{ item.opened_at }}</span>
                  </el-col>
                  <el-col class="detail-row">
                    <span class="detail-label">Channel:</span>
                    <span class="detail-value">{{ item.contact_type }}</span>
                  </el-col>
                  <el-col class="detail-row">
                    <span class="detail-label">Assignment group:</span>
                    <span class="detail-value">{{ item.assignment_group_string }}</span>
                  </el-col>
                  <el-col class="detail-row">
                    <span class="detail-label">Assigned to:</span>
                    <span class="detail-value">{{ item.assigned_to_string }}</span>
                  </el-col>
                  <el-col class="detail-row">
                    <span class="detail-label">Short Description:</span>
                    <span class="detail-value">{{ item.short_description }}</span>
                  </el-col>
                  <el-col class="detail-row">
                    <span class="detail-label">Description:</span>
                    <span class="detail-value">{{ item.description }}</span>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-item>
          </div>
        </el-collapse>
      </div>

      <!-- 底部提示 -->
      <div class="no-more">没有更多了</div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import {getSysUser, incident, queryCrmInfo} from "../api/qiyu"
import {useRouter} from 'vue-router';

import {Search} from '@element-plus/icons-vue'

const form = ref({
  user_name: '',
  first_name: '',
  last_name: '',
  u_region: '',
  department: '',
  companyString: '',
  managerString: '',
  email: '',
  location: '',
  country: '',
  phone: '',
  mobile_phone: '',
  vip: '',
});
const createBoo = ref(false);

const loading = ref(false)
const itemloading = ref(false)
const tags = ref([]);
const query = new URLSearchParams(window.location.search);

// 在组件挂载时初始化表单数据
onMounted(() => {
  const userId = query.get('userId'); // 获取名为 'session' 的参数值
  const email = query.get('email'); // 获取名为 'session' 的参数值
  console.log('userId:', userId);
  console.log('email:', email);
  if (userId) {
    queryCrmInfo(userId).then(response => {
          form.value.email = response.data.email || null;
          tags.value = response.data.tags ? JSON.parse(response.data.tags) : [];
          console.log(form.value.email)
          if (form.value.email) {
            getList()
          }
        }
    )
  } else {
    form.value.email = email || '';
    if (form.value.email) {
      getList();
    }
  }


})
const router = useRouter();

const createWorkOrder = () => {
  router.push({
    path: '/workorder',
    query: {
      email: form.value.email,
      sys_id: form.value.sys_id,
      session: query.get('session')
    }
  });
};
const getList = async () => {
  const email = form.value.email;
  items.value = [{}];
  itemsBak.value = [];
  searchKeyword.value = '';
  loading.value = true;
  itemloading.value = true;
  createBoo.value = false;
  await getSysUser(form.value.email).then(response => {
        loading.value = false
        itemloading.value = false;
        form.value = response.data || {};
        if (!response.data) {
          form.value.email = email; // 如果查不到值，恢复原来的 email
        } else {
          form.value.companyString = response.data.companyString;
          form.value.managerString = response.data.managerString;
          const query = {
            "sys_id": response.data.sys_id
          }

          itemloading.value = true;
          incident(response.data.sys_id).then(response => {
                itemloading.value = false;
                items.value = response.data || [];
                itemsBak.value = response.data || [];
              }
          )
          createBoo.value = true;
        }

      }
  )
}
const searchList = async () => {
  if (!form.value.email) {
    ElMessage({
      message: 'Email 不能为空！',
      type: 'warning',
      duration: 2000
    });
    return;
  }
  const email = form.value.email;
  await getList();


};
// const getIncidentList = async () => {
//   loading.value = true
//   incident().then(response => {
//         items.value = response.data || [];
//         itemsBak.value = response.data || [];
//         loading.value = false
//       }
//   )
// };

const items = ref([]);
const itemsBak = ref([{}]);
const searchKeyword = ref('');
let activeNames = [];


const searchWorkList = async () => {
  activeNames = [];//收起所有展开的面板
  const keyword = searchKeyword.value.toLowerCase();
  items.value = itemsBak.value.filter(item =>
      item.description?.toLowerCase().includes(keyword) ||
      item.short_description?.toLowerCase().includes(keyword) ||
      item.number?.toLowerCase().includes(keyword)
  );
};

watch(searchKeyword, (newVal) => {
  searchWorkList();
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
.customer-form-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.form-header h3 {
  margin: 0;
  color: #409eff;
}

.header-icons {
  display: flex;
  gap: 15px;
}

.header-icons .el-icon {
  color: #606266;
  font-size: 20px;
  cursor: pointer;
}

.header-icons .el-icon:hover {
  color: #409eff;
}

.single-column-form {
  width: 100%;
}

.el-form-item {
  margin-bottom: 18px;
}

.search-icon {
  color: #909399;
  font-size: 16px;
  margin-left: 8px;
  cursor: pointer;
}

.no-more {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 20px 0;
  margin-top: 10px;
}

.ticket-header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0;
}

.ticket-desc {
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 左右对齐 */
  margin-bottom: 16px;
}

.detail-label {
  align-items: center;
  font-weight: bold;
  color: #606266;
  text-align: right;
  margin-right: 10px;
  flex: 0 0 150px; /* 固定宽度 */
  white-space: nowrap; /* 防止换行 */
}

.detail-value {
  flex: 1; /* 占据剩余空间 */
  text-align: left; /* 左对齐 */
}

.tag-item {
  margin-right: 8px; /* 设置右侧间隙 */
  //margin-bottom: 8px; /* 如果换行，设置下方间隙 */
  //display: inline-flex; /* 使用 flex 布局 */
  //align-items: center; /* 垂直居中 */
  //justify-content: center; /* 水平居中 */
  //vertical-align: middle; /* 确保标签与文字对齐 */
  //line-height: 1; /* 调整行高 */
}
.ticket-details {
  display: flex; /* 使用 Flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  text-align: center; /* 文本居中 */
}
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  height: 1px; /* 固定高度 */
  line-height: 16px; /* 垂直居中 */
}
</style>