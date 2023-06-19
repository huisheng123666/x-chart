<template>
  <div class="admin-kanban">
    <el-form label-width="140" ref="formRef">
      <el-form-item label="人员配置">
        <el-form-item :label="item.label" v-for="item in data.data1" :key="item.label" required>
          <el-input-number v-model="item.value" />
        </el-form-item>
      </el-form-item>

      <el-form-item label="市场扩展">
        <el-form-item label="服务费收入">
          <el-input-number v-model="data.data2.num1" />
        </el-form-item>
        <el-form-item label="合同签约金额" style="margin-left: 20px; margin-top: 10px;">
          <el-input-number v-model="data.data2.num2" />
        </el-form-item>
        <el-form-item label="项目建设收入" style="margin-left: 20px; margin-top: 10px;">
          <el-input-number v-model="data.data2.num3" />
        </el-form-item>
        <el-form-item label="奖补资金" style="margin-left: 20px; margin-top: 10px;">
          <el-input-number v-model="data.data2.num4" />
        </el-form-item>
      </el-form-item>

      <el-form-item label="企业金融服务中心">
        <el-form-item label="入驻机构">
          <el-input-number v-model="data.data3.num1" />
        </el-form-item>
        <el-form-item label="融资对接金额" style="margin-left: 20px; margin-top: 10px;">
          <el-input-number v-model="data.data3.num2" />
        </el-form-item>
        <el-form-item label="活动场次" style="margin-left: 20px; margin-top: 10px;">
          <el-input-number v-model="data.data3.num3" />
        </el-form-item>
        <el-form-item label="融资对接户数" style="margin-left: 20px; margin-top: 10px;">
          <el-input-number v-model="data.data3.num4" />
        </el-form-item>
      </el-form-item>

      <el-form-item label="经营情况">
        <el-form-item label="营业总收入">
          <el-input-number v-model="data.data4['营业总收入']" />
        </el-form-item>
        <el-form-item label="营业总收入目标" style="margin-left: 20px; margin-top: 10px;">
          <el-input-number v-model="data.data4['营业总收入目标']" />
        </el-form-item>
        <el-form-item label="营业总利润" style="margin-left: 20px; margin-top: 10px;">
          <el-input-number v-model="data.data4['营业总利润']" />
        </el-form-item>
        <el-form-item label="营业总利润目标" style="margin-left: 20px; margin-top: 10px;">
          <el-input-number v-model="data.data4['营业总利润目标']" />
        </el-form-item>
      </el-form-item>

      <el-form-item :label="index === 0 ? '重点工作' : ''" v-for="(item, index) in data.data5" :key="item.id">
        <el-form-item label="内容">
          <el-input v-model="item.title" />
        </el-form-item>
        <el-form-item label="是否完成" >
          <el-switch v-model="item.finished" />
        </el-form-item>
        <el-form-item style="margin-left: 20px; margin-top: 10px;">
          <el-button size="small" type="primary" v-if="index === data.data5.length - 1" @click="addItem('data5', index)">添加</el-button>
          <el-button size="small" type="danger" v-if="data.data5.length > 1" @click="removeItem('data5', index)">删除</el-button>
        </el-form-item>
      </el-form-item>

      <el-form-item label="网上金融服务大厅">
        <el-form-item label="申请笔数">
          <el-input-number v-model="data.data6.num1" />
        </el-form-item>
        <el-form-item label="授信金额" style="margin-left: 20px; margin-top: 10px;">
          <el-input-number v-model="data.data6.num2" />
        </el-form-item>
        <el-form-item label="授信笔数" style="margin-left: 20px; margin-top: 10px;">
          <el-input-number v-model="data.data6.num3" />
        </el-form-item>
        <el-form-item label="放款金额" style="margin-left: 20px; margin-top: 10px;">
          <el-input-number v-model="data.data6.num4" />
        </el-form-item>
        <el-form-item label="放款笔数" style="margin-left: 20px; margin-top: 10px;">
          <el-input-number v-model="data.data6.num5" />
        </el-form-item>
      </el-form-item>

      <el-form-item label="项目完成情况" v-for="(item, index) in data.data7" :key="item.id">
        <el-form-item label="名称">
          <el-input v-model="item.name" />
        </el-form-item>
        <el-form-item label="进度">
          <el-input v-model="item.percent" />
        </el-form-item>
        <el-form-item style="margin-left: 20px; margin-top: 10px;">
          <el-button size="small" type="primary" v-if="index === data.data7.length - 1" @click="addItem('data7', index)">添加</el-button>
          <el-button size="small" type="primary" @click="changeCurrent(item.detail)">详情</el-button>
          <el-button size="small" type="danger" v-if="data.data7.length > 1" @click="removeItem('data7', index)">删除</el-button>
        </el-form-item>
      </el-form-item>

      <el-form-item label="获得资质">
        <el-form-item label="描述">
          <el-input style="width: 400px" rows="5" type="textarea" v-model="data.data8.desc" />
        </el-form-item>
        <el-form-item label="资质图">
          <el-upload
            action="https://api.threegorges-financial.com/file/upload"
            :data="{isOpen: 1}"
            list-type="picture-card"
            :file-list="data.data8.imgs"
            :on-success="uploadSuccess"
            :on-remove="removeFile"
          >
            <el-button type="primary">上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form-item>
    </el-form>

    <div class="action">
      <el-button type="primary" @click="submit">保存</el-button>
    </div>

    <el-dialog
      title="项目详情"
      v-model="showDia"
      width="900px"
      @close="showDia = false"
    >
      <el-form
        label-width="120"
      >
        <el-form-item label="项目经理">
          <el-input v-model="currentProject.manger" />
        </el-form-item>
        <el-form-item label="产品经理">
          <el-input v-model="currentProject.product" />
        </el-form-item>
        <el-form-item label="前端工程师">
          <el-input v-model="currentProject.web" />
        </el-form-item>
        <el-form-item label="后端工程师">
          <el-input v-model="currentProject.back" />
        </el-form-item>
        <el-form-item label="UI设计师">
          <el-input v-model="currentProject.ui" />
        </el-form-item>
        <el-collapse v-model="collapseValue">
          <el-collapse-item v-for="q in qList" :key="q" :name="q" :title="q">
            <el-button type="primary" style="float: right;" size="small" @click="addQItem(q)">添加</el-button>
            <el-form-item v-for="(item, index) in currentProject[q]" :key="item.id" label-width="0">
              <el-form-item label="描述" label-width="80">
                <el-input v-model="item.desc" type="textarea" style="width: 300px" :rows="3" />
              </el-form-item>
              <el-form-item label="是否完成" label-width="80">
                <el-switch v-model="item.finished" />
              </el-form-item>
              <el-form-item label="上线截点">
                <el-input style="width: 100px" v-model="item.time" />
              </el-form-item>
              <el-form-item style="margin-left: 10px">
                <el-button size="small" type="danger" @click="currentProject[q].splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="showDia=false">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import type { FormInstance } from 'element-plus'

const isEditing = ref(false)

const formRef = ref<FormInstance>()

const data = ref<any>({
  data1: [],
  data2: {},
  data3: {},
  data4: {},
  data5: [],
  data6: {},
  data7: [],
  data8: {
    desc: '',
    imgs: []
  }
})

function removeItem(key: string, index: number) {
  data.value[key].splice(index, 1)
}

function addItem(key: string, index: number) {
  const tem = key === 'data5' ? {
    id: Date.now(),
    "title": "",
    "finished": false
  } : {
    id: Date.now(),
    "name": "",
    "percent": "0%",
    detail: {
      q1: [],
      q2: [],
      q3: [],
      q4: []
    }
  }
  data.value[key].push(tem)
}

onMounted(() => {
  axios.get('/hengtai/api/tgf/kanban')
    .then(res => {
      data.value = res.data
    })
})

function uploadSuccess(res: any) {
  data.value.data8.imgs.push({
    id: res.data.mediaId,
    url: res.data.previewUrl,
    name: ''
  })
}

function removeFile(file: any, list: any[]) {
  data.value.data8.imgs = [...list]
}

function submit() {
  axios.post('/hengtai/api/tgf/kanban', {
    ...data.value
  })
    .then(res => {
      // @ts-ignore
      ElMessage.success({
        message: '修改成功',
        appendTo: document.body,
        zIndex: 9999
      })
    })
}


const showDia = ref(false)
const currentProject = ref<any>({})
const collapseValue = ref('q1')
const qList = ['q1', 'q2', 'q3', 'q4']

function changeCurrent(project: any) {
  currentProject.value = project
  showDia.value = true
}

function addQItem(key: string) {
  currentProject.value[key].push({
    "id": Date.now(),
    "desc": "",
    "finished": false,
    "time": ""
  })
}
</script>

<style scoped lang="stylus">
.admin-kanban
  padding 20px
  overflow-y scroll
  .action
    position fixed
    right 30px
    top 10px
</style>
