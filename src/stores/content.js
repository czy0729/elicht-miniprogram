/*
 * @Author: czy0729
 * @Date: 2020-10-27 10:15:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-27 10:39:42
 */
import Taro from '@tarojs/taro'
import { observable } from 'mobx'
import { dev, getTimestamp, getQueryKeyString } from '@utils'
import store from '@utils/store'
import fetch from '@utils/fetch'
import { LIST_EMPTY, screenWidth, screenHeight } from '@constants'
import { API_CONTENT_DETAIL, API_PV } from '@constants/api'

class ContentStore extends store {
  @observable state = {
    list: {
      0: LIST_EMPTY
    },

    detail: {
      0: {}
    }
  }

  // -------------------- fetch --------------------
  fetchDetail = async query => {
    const key = 'detail'
    const url = API_CONTENT_DETAIL
    const result = await fetch({
      url,
      data: query
    })

    const { status, data } = result
    if (status === 0) {
      this.setState({
        [key]: {
          [getQueryKeyString(query)]: {
            ...data,
            data: (data.data || []).map((item, index) => ({
              id: index,
              url: item.path,
              width: item.width || screenWidth,
              height: item.height || screenHeight,
              tags: (item.points || []).map((i, idx) => ({
                id: idx,
                name: i.tooltip || i.text,
                top: Number(i.top) / 100,
                left: Number(i.left) / 100,
                reverse: i.tooltip_poi === 'right',
                title: i.name,
                desc: i.description,
                product: i.product
              }))
            })),
            _loaded: getTimestamp()
          }
        }
      })
    }

    return result
  }

  pv = id =>
    fetch({
      method: 'POST',
      url: API_PV,
      data: {
        id
      }
    })
}

const Store = new ContentStore()
dev('content', Store)

export default Store
