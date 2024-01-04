import {reactive, ref} from "vue";

export function useMap(callback?: () => void) {
  const AMap = ref<any>()
  const map = ref<any>()
  const mouseTool = ref<any>()
  const complete = ref(false)
  const mapApi = reactive<{
    Polygon: any
    ImageLayer: any
    Marker: any
    Text: any
  }>({
    Polygon: null,
    ImageLayer: null,
    Marker: null,
    Text: null
  })

  AMapLoader.load({
    key: '565f6ca1679f6fc9777fe5e7f4f94edb', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      'AMap.DistrictSearch',
      'AMap.Object3DLayer',
      'AMap.ImageLayer',
      'AMap.createDefaultLayer',
      'AMap.MouseTool',
    ]
  }).then((aMap: any) => {
    AMap.value = aMap
    mapApi.ImageLayer = aMap.ImageLayer
    mapApi.Polygon = aMap.Polygon
    mapApi.Marker = aMap.Marker
    mapApi.Text = aMap.Text
    map.value = createMap()
    map.value.on('complete', () => {
      complete.value = true
      callback && callback()
    })
    mouseTool.value = new AMap.value.MouseTool(map.value)
  })

  function createMap() {
    return new AMap.value.Map('map-container', {
      center: [111.39067, 30.661644],
      disableSocket: true,
      viewMode: '2D',
      showLabel: false,
      labelzIndex: 130,
      pitch: 40,
      zooms: [17, 20],
      skyColor: '#fff'
    })
  }

  return {
    AMap,
    map,
    mouseTool,
    mapApi
  }
}
