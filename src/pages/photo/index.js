/*
 * @Author: czy0729
 * @Date: 2020-10-27 09:59:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-27 14:43:01
 */
import Taro from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Text } from '@tarojs/components'
import Photos from '@app/photos'
import { c } from '@utils'
import Info from './info'
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
    return id || 102155
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

  get $content() {
    const { content } = this.$detail
    return (
      content || {
        author_info: {},
        title: '',
        author: '',
        author_cover: '',
        time: '',
        publish_time: '',
        body: '',
        tags: []
      }
    )
  }

  get $authorInfo() {
    const { author_info = {} } = this.$content
    return author_info
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

  renderInfo() {
    const { title, publish_time, body, pv } = this.$content
    const { name, avatar } = this.$authorInfo
    const _title = title || this.$detail.title
    const _body = body || this.$detail.body
    return (
      <View>
        {!!_title && (
          <Text className={c(styles.title, 't-42 l-56 t-title t-b')}>
            {_title}
          </Text>
        )}
        <Info
          author={name}
          avatar={avatar}
          time={publish_time}
          detail={_body}
          pv={pv}
          isPreview={this.isPreview}
        />
      </View>
    )
  }

  render() {
    return (
      <View>
        <View className={styles.page}>
          <View className={styles.container}>
            {this.renderPhotos()}
            {this.renderInfo()}
            {/* {this.renderCommentPreview()} */}
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
