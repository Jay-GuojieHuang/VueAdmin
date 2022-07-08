// 引入mockjs模块
// Mock需要大写
import Mock from 'mockjs'
// 把JSON数据格式引进来
// webpack默认对外暴露 图片、JSON数据格式，所以JSON文件内不用对外暴露
import catergory1 from './category1.json'
import catergory21 from './category21.json'
import catergory22 from './category22.json'

// mock数据：第一个参数请求地址，第二个参数：请求数据
Mock.mock('/mock/getCategory1', { code: 200, data: catergory1 })

Mock.mock('/mock/getCategory2/1', { code: 200, data: catergory21 })
Mock.mock('/mock/getCategory2/2', { code: 200, data: catergory22 })

