/*
 * @Author: czy0729
 * @Date: 2020-03-03 17:23:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-27 10:44:44
 */
import Taro from '@tarojs/taro'
import { observable, computed } from 'mobx'
import { dev, setStorage, getQuery } from '@utils'
import store from '@utils/store'
import { H5, DEV_CONFIG, LIST_EMPTY } from '@constants'

const namespace = 'UserStore'
let _token
if (H5) _token = getQuery('token')

class UserStore extends store {
  @observable state = {
    /**
     * token
     */
    token:
      _token ||
      Taro.getStorageSync(`${namespace}|token`) ||
      DEV_CONFIG.token ||
      '',

    /**
     * 用户收藏
     */
    favorite: {
      0: LIST_EMPTY
    },

    /**
     * 本地点赞记录
     */
    like: {
      content: {}
    }
  }

  // -------------------- get --------------------
  @computed get token() {
    return this.state.token
  }

  @computed get isLogin() {
    return !!this.state.token
  }

  // -------------------- fetch --------------------

  // -------------------- method --------------------

  // -------------------- page --------------------
  /**
   * token入库
   */
  updateToken = token => {
    this.setState({
      token
    })
    setStorage(`${namespace}|token`, token)
  }
}

const Store = new UserStore()
dev('user', Store)

export default Store
