// 平台属性管理模块请求文件
import request from '@/utils/request'
import mockRequests from '../../../mock/mockAjax'

// 获取一级分类数据
// export const reqCategory1List = () => request({
//   url: `/admin/product/getCategory1`,
//   method: 'get'
// })
export const reqCategory1List = () => mockRequests({
  url: `/getCategory1`,
  method: 'get'
})
// 获取二级分类数据
export const reqCategory2List = (category1id) => request({
  url: `/admin/product/getCategory2/${category1id}`,
  method: 'get'
})
// 获取三级分类数据
export const reqCategory3List = (category2id) => request({
  url: `/admin/product/getCategory3/${category2id}`,
  method: 'get'
})

// 获取品牌属性
export const reqGetAttrList = (category1id, category2id, category3id) => request({
  url: `/admin/product/attrInfoList/${category1id}/${category2id}/${category3id}`,
  method: 'get'
})
// 添加属性名与属性值的接口
// {
//   attrName: '',
//   attrValueList: [],
//   categoryId: this.category3Id,
//   categoryLevel: 3
// }
export const reqAddorUpdateAttr = (data) => request({
  url: `/admin/product/saveAttrInfo/`,
  method: 'post',
  data
})
