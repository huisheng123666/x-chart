import axios from 'axios'
import { v4 } from 'uuid'
import {ElMessage} from "element-plus";

const http = axios.create({
  baseURL: import.meta.env.DEV ? 'http://192.168.28.14:8513/api' : '/api'
})

http.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use((res) => {
  if (res.data.code !== 200) {
    ElMessage({
      message: res.data.msg,
      type: 'error'
    })
    return Promise.reject(new Error(res.data.msg))
  }
  return res.data.data
}, (err) => {
  ElMessage({
    message: '网络错误，请稍后再试',
    type: 'error'
  })
  return Promise.reject(err)
})

export default http
