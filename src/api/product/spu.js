import request from '@/utils/request'

// 获取SPU列表数据的接口

export const reqSpuList = (page, limit, category3Id) => request({
  url: `/admin/product/${page}/${limit}`,
  method: 'get',
  params: { category3Id }
})

// 获取某个spu信息
export const reqSpuById = (id) => request({
  url: `/admin/product/getSpuById/${id}`,
  method: 'get'

})

// 获取品牌信息
export const reqTradeMarkList = () => request({
  url: `/admin/product/baseTrademark/getTrademarkList`,
  method: 'get'
})

// 获取spu图标的接口
export const reqSpuImageList = (SpuId) => request({
  url: `/admin/product/spuImageList/${SpuId}`,
  method: 'get'
})

// 获取平台销售属性 整个平台一共就3个
export const reqBaseSaleAttrList = () => request({
  url: `/admin/product/baseSaleAttrList`,
  method: 'get'
})

// 修改和添加spu 唯一区别是携带的参数是否带id
export const reqAddOrUpdateSpu = (spuInfo) => {
  if (spuInfo.id) {
  // 有id是修改
    return request({
      url: `admin/product/updateSpuInfo`,
      method: 'post',
      data: spuInfo
    })
  } else {
    return request({
      url: `admin/product/saveSpuInfo`,
      method: 'post'
    })
  }
}
