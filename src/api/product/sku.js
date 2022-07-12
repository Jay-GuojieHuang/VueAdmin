// 引入axios
import request from '@/utils/request'

// sku列表的接口
export const reqSkuList = (page, limit) => request({
  url: `/admin/product/list/${page}/${limit}`,
  method: 'get'
})

// 上架SKU
export const reqSale = (skuId) => request({
  url: `/admin/product/onSale/${skuId}`,
  method: 'get'
})

// 下架SKU
export const reqCancelSale = (skuId) => request({
  url: `/admin/product/cancelSale/${skuId}`,
  method: 'get'
})

// 获取sku详情的接口
export const reqGetSkuInfo = (skuId) => request({
  url: `/admin/product/getSkuById/${skuId}`,
  method: 'get'
})
