<template>
  <div class="map">
    <div id="map-container"></div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";

const opts = {
  subdistrict: 0,
  extensions: 'all',
  level: 'city'
};

const areas = [
  { name: '宜都市', shortName: '宜都市', ignore: false, center: [111.367275, 30.261595], color: 'yellow' },
  { name: '西陵区', shortName: '', ignore: true, color: 'red', center: [111.317625,30.711798] },
  { name: '伍家岗区', shortName: '', ignore: true, color: 'red', center: [111.367405,30.644639] },
  { name: '点军区', shortName: '', ignore: true, color: 'red', center: [111.179589,30.690773] },
  { name: '猇亭区', shortName: '', ignore: true, color: 'red', center: [111.457896,30.542074] },
  { name: '夷陵区', shortName: '', ignore: true, color: 'red', center: [111.299978,30.911747] },
  { name: '当阳市', shortName: '当阳市', ignore: false, center: [111.78836, 30.820893], color: 'yellow' },
  { name: '枝江市', shortName: '枝江市', ignore: false, center: [111.721197, 30.475728], color: 'yellow' },
  { name: '远安县', shortName: '远安县', ignore: false, center: [111.623598, 31.182297], color: 'rgb(255, 100, 100)' },
  { name: '兴山县', shortName: '兴山县', ignore: false, center: [110.746831, 31.348065], color: 'yellow' },
  { name: '秭归县', shortName: '秭归县', ignore: false, center: [110.677647, 30.90939], color: 'yellow' },
  { name: '长阳土家族自治县', shortName: '长阳县', ignore: false, center: [110.868586, 30.456471], color: 'yellow' },
  { name: '五峰土家族自治县', shortName: '五峰县', ignore: false, color: 'yellow', center: [110.524319, 30.206254] }
]

/* @ts-ignore */
AMapLoader.load({
  key: "565f6ca1679f6fc9777fe5e7f4f94edb",       // 申请好的Web端开发者Key，首次调用 load 时必填
  version: "1.4.15",                 // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins: ['AMap.DistrictSearch', 'AMap.Object3DLayer'],
})
  .then((AMap: any) => {
    const district = new AMap.DistrictSearch(opts);
    district.search('宜昌市', function(status: any, result: any) {
      const bounds = result.districtList[0].boundaries;
      const mask = []
      for(let i =0; i<bounds.length; i+=1){
        mask.push([bounds[i]])
      }
      const map = createMap(AMap, mask)
      //添加描边
      for(let i =0; i<bounds.length; i+=1){
        new AMap.Polyline({
          path:bounds[i],
          strokeColor:'#99ffff',
          strokeWeight:4,
          map:map
        })
      }
      addText(AMap, map)
      addLayer(AMap, map)
      add3DWall(AMap, map, bounds)
    });
  })

const polygons: any = {}

function clickArea(area: string) {
  window.parent.postMessage({ type: 'area', area }, '*')
}

function addLayer(AMap: any, map: any) {
  const district = new AMap.DistrictSearch({
    subdistrict: 0,
    extensions: 'all',
    level: 'district' // district
  });

  areas.forEach(item => {
    district.search(item.name, (status: any, result: any) => {
      const pathArray = result.districtList[0].boundaries
      pathArray.forEach((path: any) => {
        const polygon = new AMap.Polygon({
          strokeColor: '#FFDD9A',
          strokeOpacity: 1,
          strokeWeight: 2.5,
          zIndex: 12,
          fillColor: '#4E94FA',
          fillOpacity: 0.6
        });
        polygon.setPath(path);
        map.add(polygon)
        if (!polygons[item.name]) {
          polygons[item.name] = [polygon]
        } else {
          polygons[item.name].push(polygon)
        }
        polygon.on('mouseover', () => {
          clearPolyActive()
          polygon.setOptions({
            fillColor: 'orange'
          })
        })

        polygon.on('mouseout', () => {
          polygon.setOptions({
            fillColor: '#4E94FA'
          })
        })

        polygon.on('click', () => clickArea(item.name))
      })
    })
  })
}

function add3DWall(AMap: any, map: any, bounds: any) {
  const object3Dlayer = new AMap.Object3DLayer({ zIndex: 1 });
  map.add(object3Dlayer)
  const wall = new AMap.Object3D.Wall({
    path: bounds,
    height: -60000,
    color: '#3F99FF'
  });
  wall.transparent = true
  object3Dlayer.add(wall)
}

function createMap(AMap: any, mask: any) {
  return new AMap.Map('map-container', {
    mask:mask,
    center:[111.120449,30.36136],
    disableSocket: true,
    viewMode:'3D',
    showLabel:false,
    labelzIndex:130,
    pitch:40,
    zoom:9.45,
    layers:[
      new AMap.TileLayer.Satellite()
    ],
    skyColor: '#050F1A',
    mapStyle: 'amap://styles/f0d89ee04dcc7d5969e34dff0b9a348a'
  });
}

function addText(AMap: any, map: any) {
  areas.forEach(area => {
    const text = new AMap.Text({
      text: area.shortName || area.name,
      anchor: 'center', // 设置文本标记锚点
      // draggable: true,
      cursor: 'pointer',
      // angle:10,
      style: {
        'background-color': 'transparent',
        'border-width': 0,
        'font-size': '12px',
        'font-weight': 'bold',
        color: '#fff'
      },
      position: area.center,
      zIndex: -1
    });
    text.setMap(map);

    text.on('click', () => clickArea(area.name))

    text.on('mouseover', () => {
      clearPolyActive()
      polygons[area.name].forEach((poly: { setOptions: (arg0: { fillColor: string; }) => void; }) => {
        poly.setOptions({
          fillColor: 'orange'
        })
      })
    })
  })
}

function clearPolyActive() {
  Object.keys(polygons).forEach(key => {
    const poly = polygons[key]
    poly.forEach((p: any) => {
      p.setOptions({
        fillColor: '#4E94FA'
      })
    })
  })
}

</script>

<style scoped lang="stylus">
.map
  height 100%
  #map-container
    height 100%
    background #000
    ::v-deep(canvas)
      background-color #000
</style>
