import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'nprogress/nprogress.css'

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, BarChart, LineChart, PictorialBarChart, TreeChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent
} from 'echarts/components'
import VueECharts from 'vue-echarts'

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
  TreeChart
])

const app = createApp(App)

app.use(createPinia())
app.use(router)

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
