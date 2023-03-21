<template>
  <v-chart :option="option" class="pie" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import 'echarts-gl'

interface ChartItem {
  name: string
  value: number
}

const props = withDefaults(defineProps<{
  values?: ChartItem[]
  grid?: any
  showTitle?: boolean
  legend?: any
}>(), {
  values: () => [
    {
      name: "200万以上",
      value: 160,
    },
    {
      name: "200万-100万",
      value: 180,
    },
    {
      name: "100万以下",
      value: 200,
    }
  ],
  grid: {},
  legend: {}
})

const option = ref<any>({});

const angleS = computed(() => {
  let total = 0
  const res: number[] = []
  props.values.forEach((item: any) => {
    total += item.value
  });
  props.values.forEach((item: any) => {
    res.push(360 * (item.value / total))
  });
  return res
})

const percents = computed(() => {
  let total = 0
  const res = []
  props.values.forEach((item: any) => {
    total += item.value
  });
  let last = 100
  for (let i = 0; i < props.values.length - 1; i++) {
    const item = props.values[i] as any
    const per = (item.value / total).toFixed(2)
    const num = Number(per.toString().split('.')[1])
    last -= num
    res.push(num + '%')
  }
  res.push(last + '%')
  return res
})


let activeIndex = 0
let pageHide = false

let timer = 0

function animation() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    option.value.grid3D.viewControl.beta += angleS.value[activeIndex]
    if (activeIndex >= props.values.length - 1) {
      activeIndex = 0
    } else {
      activeIndex++
    }
    for (let i = 0; i < props.values.length; i++) {
      const item = option.value.series[i]
      const isSelected = item.pieStatus.selected;
      const k = item.pieStatus.k;
      const startRatio = item.pieData.startRatio;
      const endRatio = item.pieData.endRatio;
      option.value.series[i].parametricEquation = getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        false,
        k,
        i === activeIndex ? 35 : 10
      );
    }
    if (props.showTitle) {
      setTimeout(() => {
        option.value.title.subtext = option.value.series[activeIndex].pieData.name
        option.value.title.text = percents.value[activeIndex]
      }, 2000);
    }
    if (!pageHide) animation()
  }, 2000);
}

option.value = getPie3D(
  props.values,
  0.8
)

animation()

window.addEventListener('visibilitychange', () => {
  pageHide = document.hidden;
  if (!pageHide) {
    animation()
  }
})

// 生成模拟 3D 饼图的配置项
function getPie3D(pieData: any, internalDiameterRatio: number) {
  const series = [];
  // 总和
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  const legendData = [];
  const k =
    typeof internalDiameterRatio !== "undefined"
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3;
  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i += 1) {
    sumValue += pieData[i].value;
    const seriesItem: any = {
      name: pieData[i].name,
      type: "surface",
      parametric: true,
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k,
      },
    };
    if (typeof pieData[i].itemStyle !== "undefined") {
      const { itemStyle } = pieData[i];
      typeof pieData[i].itemStyle.color !== "undefined"
        ? (itemStyle.color = pieData[i].itemStyle.color)
        : null;
      typeof pieData[i].itemStyle.opacity !== "undefined"
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null;
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }
  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i += 1) {
    endValue = startValue + series[i].pieData.value;
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      // ，使除了第一个之外的值都是10
      series[i].pieData.value === series[0].pieData.value ? 35 : 10
    );
    startValue = endValue;
    legendData.push(series[i].name);
  }
  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  const option = {
    title: props.showTitle ? {
      text: percents.value[0],
      subtext: (props.values[0] as any).name,
      textAlign: 'center',
      left: '28%',
      top: '32%',
      textStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
      },
      subtextStyle: {
        color: '#C2DAF2',
        fontSize: 12
      }
    } : null,
    color: [
      "#00C6D8",
      "#2693FF",
      "#61F2A5",
      "#47D8E1",
      "#E1CD47",
      "#4F5AED",
      "#E19D47",
    ],
    legend: {
      type: "scroll",
      data: legendData,
      icon: "circle",
      itemGap: 24,
      right: 10,
      top: '15%',
      orient: 'vertical',
      itemWidth: 10, // 设置宽度
      itemHeight: 10, // 设置高度
      selectedMode: true,
      textStyle: {
        color: "#C2DAF2",
        lineHeight: 15,
        rich: {
          a: {
            align: 'left',
            width: 80,
            fontSize: 14,
            lineHeight: 20
          },
          c: {
            align: 'left',
            width: 90,
            fontSize: 14,
            lineHeight: 20
          },
          b: {
            color: '#fff',
            align: 'right',
            fontSize: 14,
            fontWeight: 'bold'
          }
        }
      },
      ...props.legend
    },
    tooltip: {
      formatter: (params: any) => {
        if (params.seriesName !== "mouseoutSeries") {
          return `${props.values[params.seriesIndex].name
            }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color
            };"></span>${percents.value[params.seriesIndex]}`;
        }
        return "";
      },
    },
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      min: -1,
      max: "dataMax",
    },
    grid3D: {
      show: false,
      boxHeight: 16,
      top: "-10%",
      left: "-20%",
      viewControl: {
        // 3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: 40,
        beta: -180, //旋转角度
        rotateSensitivity: 1,
        zoomSensitivity: 0,
        panSensitivity: 0,
        // autoRotate: true,
        distance: 150,
        animationDurationUpdate: 1980
      },
      ...props.grid
    },
    series,
  };
  return option;
}

// 生成扇形的曲面参数方程
function getParametricEquation(
    startRatio: number,
    endRatio: number,
    isSelected: boolean,
    isHovered: boolean,
    k: number,
    h: number
  ) {
  // 计算
  const midRatio = (startRatio + endRatio) / 2;
  const startRadian = startRatio * Math.PI * 2;
  const endRadian = endRatio * Math.PI * 2;
  const midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    // eslint-disable-next-line no-param-reassign
    isSelected = false;
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  // eslint-disable-next-line no-param-reassign
  k = typeof k !== "undefined" ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },

    x(u: number, v: number) {
      if (u < startRadian) {
        return (
          offsetX +
          Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y(u: number, v: number) {
      if (u < startRadian) {
        return (
          offsetY +
          Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z(u: number, v: number) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      // 当前图形的高度是Z根据h（每个value的值决定的）
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
}
</script>

<style lang="stylus" scoped>
.pie
  width 400px
  height 200px
</style>
