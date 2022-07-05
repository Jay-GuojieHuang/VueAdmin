// 这个模块主要获取的是品牌管理的数据
import request from '@/utils/request'
// 获取品牌列表接口
export const reqTradeMarkList = (page, limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`,
  method: 'get'
})
// 新增or修改品牌
export const reqAddOrUpdateTradeMark = (trademark) => {
  // 带给服务器的数据携带id--修改
  if (trademark.id) {
    return request({
      url: `/admin/product/baseTrademark/update`,
      method: 'put',
      data: trademark
    })
  } else {
    return request({
      url: `/admin/product/baseTrademark/save`,
      method: 'post',
      data: trademark
    })
  }
}

// 删除品牌接口

export const reqDeleteTradeMark = (id) => request({
  url: `/admin/product/baseTrademark/remove/${id}`,
  method: 'delete'
})
