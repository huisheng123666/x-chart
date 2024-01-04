import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'nprogress/nprogress.css'

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import {
  PieChart,
  BarChart,
  LineChart,
  PictorialBarChart,
  TreeChart,
  GaugeChart
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent
} from 'echarts/components'
import VueECharts from 'vue-echarts'
import DataVVue3 from '@kjgl77/datav-vue3'
import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'

// appendSwiper()

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  PictorialBarChart,
  TreeChart,
  GaugeChart
])

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(DataVVue3)

app.component('v-chart', VueECharts)

app.mount('#app')

function appendSwiper() {
  const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL
  const css = document.createElement('link')
  css.rel = 'stylesheet'
  css.href = base + '/swiper.min.css'
  document.head.appendChild(css)
  const script = document.createElement('script')
  script.src = base + '/swiper.min.js'
  document.head.appendChild(script)
}
