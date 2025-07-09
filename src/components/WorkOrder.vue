<template>
  <!--  <div class="customer-form-container">-->
  <div>
    <div class="form-header">
      <h3>工单信息</h3>
    </div>

    <el-form :model="form" label-width="150px" class="single-column-form" v-loading="loading">
      <el-form-item label="Caller email">
        <template #label>
          <span style="color: red;">*</span> Caller email:
        </template>
        <el-input v-model="form.email" disabled placeholder=""/>
      </el-form-item>

      <el-form-item label="Ticket type">
        <template #label>
          <span style="color: red;">*</span> Ticket type:
        </template>
        <el-radio-group v-model="form.type">
          <el-radio label="Incident">Incident</el-radio>
          <el-radio label="Inquiry">Inquiry</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Short Description">
        <template #label>
          <span style="color: red;">*</span> Short Description:
        </template>
        <el-input v-model="form.short_description" placeholder=""/>
      </el-form-item>

      <el-form-item label="Description" prop="priority">
        <template #label>
          <span style="color: red;">*</span> Description:
        </template>
        <el-input v-model="form.description" :rows="4" type="textarea" placeholder=""/>
      </el-form-item>

      <el-form-item label="Urgency" prop="group">
        <template #label>
          <span style="color: red;">*</span> Urgency:
        </template>
        <el-select v-model="urgencyValue" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Impact:">
        <template #label>
          <span style="color: red;">*</span> Impact:
        </template>
        <el-select v-model="impactValue" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Priority:">
        <template #label>
          <span style="color: red;">*</span> Priority:
        </template>
        <el-input v-model="priority" disabled placeholder=""/>
        <el-input v-model="priorityValue" v-if="false"/>
      </el-form-item>
<!--      <el-form-item label="Service Offerring:">-->
<!--        &lt;!&ndash;        <template #label>&ndash;&gt;-->
<!--        &lt;!&ndash;          <span style="color: red;">*</span> Service Offerring:&ndash;&gt;-->
<!--        &lt;!&ndash;        </template>&ndash;&gt;-->
<!--        <el-input v-model="form.service_offerring" disabled placeholder="预留字段，暂未开启"/>-->
<!--      </el-form-item>-->

      <el-form-item label="Service Offerring:">
        <template #label>
          <span style="color: red;">*</span> Service Offerring:
        </template>
        <el-select v-model="serviceOfferingValue" placeholder="请选择" filterable>
          <el-option
              v-for="item in serviceOfferingList"
              :key="item.sys_id"
              :label="item.name"
              :value="item.sys_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Assignment group:">
        <template #label>
          <span style="color: red;">*</span> Assignment group:
        </template>
        <el-select v-model="assignmentGroupValue" placeholder="请选择" filterable>
          <el-option
              v-for="item in assignmentGroupList"
              :key="item.sys_id"
              :label="item.name"
              :value="item.sys_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Assigned to:">
        <el-select v-model="assignmentToValue" placeholder="请选择" filterable>
          <el-option
              v-for="item in assignmentToList"
              :key="item.user.link"
              :label="item.user.display_value"
              :value="item.user.link">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="">
        <el-button type="primary" @click="handleSubmit(1)">提交</el-button>
        <el-button type="primary" @click="handleSubmit(6)">提交并关闭</el-button>
        <el-button type="primary" @click="cancel">返回</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';

import {addIncident, getGroup, serviceOffering, getTO} from "../api/qiyu"

import {useRoute, useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';

const form = ref({});

const urgencyValue = ref('');
const impactValue = ref('');
const priority = ref('');
const priorityValue = ref('');
const options = [
  {value: '1', label: '1 - High'},
  {value: '2', label: '2 - Medium'},
  {value: '3', label: '3 - Low'}
];
const assignmentGroupValue = ref('');
const assignmentGroupList = ref([]);
const assignmentToValue = ref('');
const assignmentToList = ref([]);
const serviceOfferingValue = ref('');
const serviceOfferingList = ref('');


const route = useRoute();
const session = ref('');

onMounted(() => {
  console.log('传递的参数email:', route.query.email);
  console.log('传递的参数sys_id:', route.query.sys_id);
  form.value.email = route.query.email || '';
  form.value.sys_id = route.query.sys_id || '';
  session.value = route.query.session || '';
});


// 监听 urgencyValue 和 impactValue 的变化
watch([urgencyValue, impactValue], ([newUrgency, newImpact]) => {
  if (newUrgency === '1' && newImpact === '1') {
    priority.value = '1 - Critical';
    priorityValue.value = '1';
  } else if (newUrgency === '1' && newImpact === '2') {
    priority.value = '2 - High';
    priorityValue.value = '2';
  } else if (newUrgency === '1' && newImpact === '3') {
    priority.value = '3 - Moderate';
    priorityValue.value = '3';
  } else if (newUrgency === '2' && newImpact === '1') {
    priority.value = '2 - High';
    priorityValue.value = '2';
  } else if (newUrgency === '2' && newImpact === '2') {
    priority.value = '3 - Moderate';
    priorityValue.value = '3 ';
  } else if (newUrgency === '2' && newImpact === '3') {
    priority.value = '4 - Low';
    priorityValue.value = '4 ';
  } else if (newUrgency === '3' && newImpact === '1') {
    priority.value = '3 - Moderate';
    priorityValue.value = '3';
  } else if (newUrgency === '3' && newImpact === '2') {
    priority.value = '4 - Low';
    priorityValue.value = '4';
  } else if (newUrgency === '3' && newImpact === '3') {
    priority.value = '4 - Low';
    priorityValue.value = '4';
  } else {
    priority.value = '';
  }
});

// 监听 assignmentGroupValue 的变化
watch(assignmentGroupValue, async (newValue) => {
  assignmentToValue.value = ''; // 清空 Assigned to 的值
  if (newValue) {
    const response = await getTO(newValue);
    assignmentToList.value = response.data || [];
  } else {
    assignmentToList.value = [];
  }
});


const loading = ref(false)
// 在组件挂载时初始化表单数据
onMounted(() => {

  getGroup().then(response => {
        assignmentGroupList.value = response.data || {};
        assignmentGroupValue.value = '74b6ad021bc60690d3d369cb234bcb9e';
      }
  )
  serviceOffering().then(response => {
        serviceOfferingList.value = response.data || {};
      }
  )
  form.value.type = 'Incident';

})

const getList = async () => {
  const email = 'yuchen.zhang@dxc.com';
  // loading.value = true
  // getSysUser(email).then(response => {
  //       form.value = response.data || {};
  //       form.value.companyString = response.data.companyString;
  //       form.value.managerString = response.data.managerString;
  //       loading.value = false
  //     }
  // )
}

const router = useRouter();
const cancel = async () => {
  router.push({
    path: '/user', // 返回上一页
    query: {
      email: form.value.email // 将 email 信息传递回去
    }
  });
}
const handleSubmit = async (state) => {
  const  assigned_to = assignmentToValue.value.split('/').pop();
  console.log(assigned_to);
  // 校验必填字段
  if (!form.value.email || !urgencyValue.value || !impactValue.value || !form.value.short_description || !form.value.description || !assignmentGroupValue.value|| !serviceOfferingValue.value) {
    ElMessage({
      message: '请填写所有必填字段！',
      type: 'warning',
      duration: 2000
    });
    return;
  }
  loading.value = true;
  try {
    const payload = {
      caller_id: form.value.sys_id, // 修正为从 form.email 获取
      state: state,
      u_on_behalf_of: form.value.sys_id,// 确认此值是否正确
      urgency: urgencyValue.value, // 修正为从 urgencyValue 获取
      impact: impactValue.value, // 修正为从 impactValue 获取
      short_description: form.value.short_description, // 修正为直接从 form 获取
      description: form.value.description, // 修正为直接从 form 获取
      service_offering: serviceOfferingValue.value,
      assignment_group: assignmentGroupValue.value,
      u_ticket_originated_in: 'DSCN',
      channel: 'chat_im',
      assigned_to: assigned_to
    };
    // 根据单选框的值动态添加字段
    if (form.value.type === 'Inquiry') {
      payload.category = 'service_offering';
      payload.subcategory = 'inquiry';
    }
    const response = await addIncident(payload);
    console.log('新增成功:', response);
    ElMessage({
      message: '新增成功！',
      type: 'success',
      duration: 2000
    });
    router.push({
      path: '/user', // 返回上一页
      query: {
        email: form.value.email // 将 email 信息传递回去
      }
    });
  } catch (error) {
    console.error('新增失败:', error);
    ElMessage({
      message: '新增失败，请重试！',
      type: 'error',
      duration: 2000
    });
  } finally {
    loading.value = false;
  }
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
</style>