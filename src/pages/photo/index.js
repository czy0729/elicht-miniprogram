/*
 * @Author: czy0729
 * @Date: 2020-10-27 09:59:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-27 11:53:05
 */
import Taro from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import { toJS } from 'mobx'
import Photos from '@app/photos'
import styles from './index.module.scss'

@inject('ContentStore', 'UserStore')
@observer
class Photo extends Taro.Component {
  async componentDidMount() {
    this.mounted = true

    await this.fetchCaseDetail()
    // this.fetchComment(true)

    if (this.$isLogin) {
      // this.fetchInfo()
      // this.doCheckIsCollect()
      // this.doCheckIsLike()
    }
  }

  mounted = false

  fetchCaseDetail = async () => {
    const result = await this.ContentStore.fetchDetail(this.query)
    if (typeof result === 'object') {
      const { status } = result
      if (status !== 0) {
        // replace('404')
      }
    }
    return result
  }

  get id() {
    const { id } = this.$router.params
    return id || 102156
  }

  get query() {
    return {
      id: this.id
    }
  }

  get $isLogin() {
    return this.UserStore.isLogin
  }

  get $detail() {
    return this.ContentStore.getState('detail', this.query)
  }

  get ContentStore() {
    const { ContentStore } = this.props
    return ContentStore
  }

  get UserStore() {
    const { UserStore } = this.props
    return UserStore
  }

  renderPhotos() {
    const { data = [] } = this.$detail
    return <Photos data={data} />
  }

  render() {
    console.log(toJS(this.$detail))
    return (
      <View>
        <View className={styles.page}>
          <View className={styles.container}>
            {this.renderPhotos()}
            {/* {this.renderInfo()}
            {this.renderCommentPreview()} */}
          </View>
          {/* {this.renderRelative()} */}
        </View>
        {/* {!this.isPreview && (
          <View>
            {this.renderFixed()}
            {this.renderComment()}
            {this.renderToast()}
            {this.renderPoster()}
          </View>
        )} */}
      </View>
    )
  }
}

export default Photo
