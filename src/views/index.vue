<template>
  <div class="map" id="map-container"></div>
  <el-dialog title="商铺详情" v-model="showDialog" width="900" append-to-body>
    <el-descriptions title="基本信息" :column="3">
      <el-descriptions-item label="商铺编码">A1-001-001</el-descriptions-item>
      <el-descriptions-item label="所属区域">A1区</el-descriptions-item>
      <el-descriptions-item label="商业业态">蔬菜类</el-descriptions-item>
      <el-descriptions-item label="商铺类型">摊位</el-descriptions-item>
      <el-descriptions-item label="商铺面积">120</el-descriptions-item>
      <el-descriptions-item label="当前商户">XXXXXX贸易公司</el-descriptions-item>
    </el-descriptions>

    <el-radio-group v-model="tabValue" style="width: 100%; margin-top: 20px">
      <el-radio-button :label="1">合同管理</el-radio-button>
      <el-radio-button :label="2">过磅信息</el-radio-button>
      <el-radio-button :label="3">用水信息</el-radio-button>
      <el-radio-button :label="4">用电信息</el-radio-button>
    </el-radio-group>

    <div class="progress">
      <el-progress :percentage="100" status="success" :show-text="false" />
      <el-progress :percentage="100" status="exception" :show-text="false" />
      <el-progress :percentage="100" status="success" :show-text="false" />
      <span>2021.8.1</span>
      <span>2021.8.1</span>
      <span>2021.8.1</span>
    </div>

    <el-table border :data="list">
      <el-table-column label="商户" prop="index" width="140" show-overflow-tooltip="" />
      <el-table-column label="合同编码" prop="orderNo" width="120" show-overflow-tooltip="" />
      <el-table-column label="手机号" prop="mobile" width="120" />
      <el-table-column label="合同开始时间" width="120" prop="start" />
      <el-table-column label="合同结束时间" width="120" prop="end" />
      <el-table-column label="合同商铺" prop="addr" width="140" show-overflow-tooltip="" />
      <el-table-column label="合同金额" prop="price" />
    </el-table>
  </el-dialog>
  <teleport to="body">
    <el-button class="add-address" type="primary" @click="drawPolygon">商铺绘制（左键开始，右键结束）</el-button>
  </teleport>
  <el-dialog title="添加" v-model="showAdd">
    <el-form ref="addFormRef" :model="addForm" :rules="addRule" label-width="80">
      <el-form-item label="编号" prop="id">
        <el-select filterable v-model="addForm.id">
          <el-option v-for="item in shops" :key="item" :label="item.shopCode" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="位置">{{ addForm.shopPosition }}</el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="addShopPos" :loading="addLoading">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {h, reactive, ref} from 'vue'
import {useMap} from "@/hooks/useMap";
import {ElLoading, ElMessage} from 'element-plus'
import type {FormInstance, FormRules} from 'element-plus'
import {mapOuter, sleep} from "@/common";
import http from "@/common/http";

type Position = [number, number]

type BlockPositions = Position[][]


/* -------------------------- room info -------------------------- */
const showDialog = ref(false)

const tabValue = ref(1)

const list = [
  {
    index: 'XXXXX贸易公司',
    orderNo: 'HT001-002',
    mobile: '138XXXXXX',
    start: '2023.8.1',
    end: '2025.8.1',
    addr: 'A1-001-001.A1-001-001',
    price: '20000元'
  }
]


/* -------------------------- map -------------------------- */
const colors = ['#FF3355', '#3399FF', '#00D948']

const dots: BlockPositions = [
  [
    [111.38287, 30.665566],
    [111.397966, 30.665566],
    [111.397966, 30.656422],
    [111.38287, 30.656422]
  ]
]

const pos1 = [[111.38287, 30.665566], [111.390417, 30.665566]]
const pos2 = [[111.390417, 30.665566], [111.397966, 30.665566]]
const pos3 = [[111.38287, 30.660992], [111.390417, 30.660992]]
const pos4 = [[111.390417, 30.660992], [111.397966, 30.665566]]

const fullLoading = ElLoading.service({
  lock: true,
  text: '加载中',
  background: 'rgba(255, 255, 255, 1)',
})

const shops = ref<any[]>([])
const showAdd = ref(false)

let roomTexts: any[] = []
let polygons: any[] = []

let isDraw = false

const { AMap, map, mapApi, mouseTool } = useMap(() => {
  genWhiteLayer()
  addImgLayer()
  // getRooms()
  map.value.on('zoomchange', () => {
    const scale = (map.value.getZoom() - 17) / 3
    roomTexts.forEach(text => {
      text.setStyle({
        transform: `scale(${scale > 0.2 ? scale : 0.2})`,
      })
    })
  })
})

function getRooms() {
  http.get<any, any>('/setting/shop/list', {
    params: {
      pageSize: 0,
      pageNo: 0
    }
  })
    .then(res => {
      shops.value = res.list
      genRoom()
    })
}

async function genRoom() {
  polygons.forEach(item => {
    map.value.remove(item)
  })
  roomTexts.forEach(item => {
    map.value.remove(item)
  })
  polygons = []
  roomTexts = []
  for (let i = 0; i < shops.value.length; i++) {
    const room = shops.value[i]
    if (room.shopPosition) {
      polygons.push(addRoom([JSON.parse(room.shopPosition)], colors[i % 3], room.id))
      roomTexts.push(addText(room.shopCode, JSON.parse(`[${room.shopCenter}]`), room.id))
      await sleep(200)
    }
  }
}

function genWhiteLayer() {
  const pathArray = [mapOuter(AMap)]

  pathArray.push.apply(pathArray, dots)

  let polygon = new mapApi.Polygon({
    pathL: pathArray,
    strokeColor: 'red',
    strokeWeight: 0,
    fillColor: '#fff',
    fillOpacity: 1
  })
  polygon.setPath(pathArray)
  map.value.add(polygon)
}

// [111.382556, 30.666475], [111.399, 30.656267]

async function addImgLayer() {
  const xDis = 111.399 - 111.382556
  const yDis = 30.666475 - 30.656267
  const xSingle = xDis / 4
  const ySingle = yDis / 4
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const start = [111.382556 + j * xSingle, 30.666475 - i * ySingle]
      const end = [111.382556 + (j + 1) * xSingle, 30.666475 - (i + 1) * ySingle]
      await addImgLayerToMap(start, end, i * 4 + j + 1)
      await sleep(200)
    }
  }
}

function addImgLayerToMap(start: number[], end: number[], index: number) {
  return new Promise<any>(resolve => {
    const imageLayer = new mapApi.ImageLayer({
      url: `/maps/map${index}.jpeg`,
      bounds: new AMap.value.Bounds(start, end),
      zooms: [17, 20]
    })
    imageLayer.on('complete', () => {
      resolve(imageLayer)
      fullLoading.close()
    })
    map.value.add(imageLayer)
  })
}


function addRoom(rect: BlockPositions, color: string, id: number) {
  let polygon = new mapApi.Polygon({
    path: rect,
    fillColor: color,
    strokeOpacity: 1,
    fillOpacity: 1,
    strokeColor: color,
    strokeWeight: 2,
    extData: {
      id
    },
    zIndex: 9
  })
  polygon.on('click', () => {
    if (isDraw) return
    console.log(polygon.getExtData())
    showDialog.value = true
  })
  map.value.add(polygon)
  return polygon
}

/* ----------------------------------- add ----------------------------------- */
const addForm = reactive({
  id: '',
  shopPosition: ''
})

const addFormRef = ref<FormInstance>()

const addRule: FormRules = {
  id: [
    { required: true, message: '请选择编号' }
  ]
}

const addLoading = ref(false)

function addShopPos() {
  addFormRef.value?.validate(valid => {
    if (valid) {
      addLoading.value = true
      http.put('/setting/shop', {
        ...addForm
      })
        .then(res => {
          addFormRef.value?.resetFields()
          showAdd.value = false
          addLoading.value = false
          getRooms()
        })
        .catch(() => {
          addLoading.value = false
        })
    }
  })
}

function drawPolygon() {
  isDraw = true
  ElMessage.success('请点击左键开始绘制')
  mouseTool.value.polygon({
    strokeColor: "#FF33FF",
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: '#1791fc',
    fillOpacity: 0.4,
    // 线样式还支持 'dashed'
    strokeStyle: "solid",
    zIndex: 11
    // strokeStyle是dashed时有效
    // strokeDasharray: [30,10],
  })

  mouseTool.value.on('draw', (e: any) => {
    const arr = e.obj.getPath().map((item: { lng: any; lat: any; }) => [item.lng, item.lat])
    mouseTool.value.close()
    showAdd.value = true
    addForm.shopPosition = JSON.stringify(arr)
    map.value.remove(e.obj)
    isDraw = false
    e.obj.on('click', () => {
      map.value.remove(e.obj)
    })
  })
}

function addText(code: string, center: Position, id: number) {
  const scale = (map.value.getZoom() - 17) / 3
  const text = new mapApi.Text({
    text: code,
    anchor:'center', // 设置文本标记锚点
    cursor:'pointer',
    bubble: true,
    style:{
      // 'padding': '.75rem 1.25rem',
      // 'margin-bottom': '1rem',
      border: 'none',
      'background-color': 'transparent',
      // 'width': '15rem',
      // 'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
      'text-align': 'center',
      'font-size': '15px',
      'color': '#fff',
      transform: `scale(${scale})`,
    },
    // zooms: [19, 20],
    position: center,
    extData: {
      id
    }
  });

  map.value.add(text)

  text.on('click', () => {
    if (isDraw) return
    console.log(text.getExtData())
    showDialog.value = true
  })

  return text
}
</script>

<style scoped lang="stylus">
.map
  width: 100vw
  height: 100vh


.progress
  margin-top 20px
  margin-bottom 20px
  display grid
  grid-template-columns 1fr 300px 1fr
  grid-template-rows 10px 16px
  grid-row-gap 5px
  font-size 14px

.add-address
  position fixed
  right 20px
  top 20px

::v-deep(.el-radio-button)
  width 25%
  .el-radio-button__inner
    display block
</style>
