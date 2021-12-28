//对于axios进行二次封装
import axios from 'axios'
//引入请求进度条 start()开始  done()结束
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'


// 利用axios对象的方法create，创建一个axios实例
const requests = axios.create({
    // 配置对象

    //基础路径
    baseURL: '/mock',
    timeout: 5000
})

//请求拦截器
requests.interceptors.request.use((config) => {
    //进度条开始
    nprogress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //进度条结束
    nprogress.done()

    // 响应成功的回调
    return res.data
}, (error) => {
    // 响应失败的回调
    return Promise.reject(new Error('faile'))
})


export default requests