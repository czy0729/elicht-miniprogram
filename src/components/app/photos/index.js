/*
 * @Author: czy0729
 * @Date: 2019-08-09 17:58:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-27 12:18:39
 */
import Taro from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import CImage from '@base/c-image'
import Layout from '@base/layout'
import Iconfont from '@base/iconfont'
import { sfc, c, px, push, oss } from '@utils'
import { phone } from '@constants'
import TagCase from '../tag-case'
import styles from './index.module.scss'

const H_BOTTOM = 320 // 底部预留高度
const H_FIXED_HEADER = 0

class Photos extends Taro.Component {
  state = {
    files: [],
    open: false,
    fullScreen: false,
    item: {},
    current: 0
  }

  componentDidMount() {
    const { data } = this.props
    this.setState({
      files: data
    })
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps
    this.setState({
      files: data
    })
  }

  onChange = evt => {
    const { onChange } = this.props
    const { detail } = evt
    const { current } = detail
    this.setState({
      current
    })
    onChange(current)
  }

  onTagClick = item => {
    if (item.product && item.product.id) {
      push(item.product.model === 'article' ? 'item/user' : 'item', {
        id: item.product.id
      })
      return
    }

    if (!item.title && !item.desc) {
      return
    }

    this.setState({
      open: true,
      item
    })
  }

  onClose = () =>
    this.setState({
      open: false
    })

  onLinkClick = url => window.open(url)

  onFullScreen = () => {
    this.setState({
      open: false,
      fullScreen: true
    })
  }

  onCloseFullScreen = () =>
    this.setState({
      open: false,
      fullScreen: false
    })

  preventDefault = e => {
    e.stopPropagation()
    e.preventDefault()
  }

  get carouselHeight() {
    const { screenWidth, screenHeight, pxRatio } = phone()
    const { files } = this.state
    if (!files.length) {
      return screenWidth
    }

    const maxRatio =
      (files[0].height || screenWidth) / (files[0].width || screenWidth)

    const maxContainerHeight =
      screenHeight - (H_FIXED_HEADER + H_BOTTOM) * pxRatio

    const minHeight = 240
    const screenMinRatio = minHeight / maxContainerHeight
    if (maxRatio < screenMinRatio) {
      return screenWidth
    }

    const screenMaxRatio = maxContainerHeight / screenWidth
    if (maxRatio > screenMaxRatio) {
      return screenWidth * screenMaxRatio
    }

    return screenWidth * maxRatio
  }

  get hasTag() {
    const { files } = this.state
    let has = false
    files.forEach(item => {
      if (has) return
      if (item.tags.length) has = true
    })
    return has
  }

  renderPagination() {
    const { files, current } = this.state
    return (
      files.length > 1 && (
        <View className={styles.pagination}>
          <Text className='t-22 l-32 t-plain'>
            {current + 1} / {files.length}
          </Text>
        </View>
      )
    )
  }

  /**
   * 页面缩放的图片轮播
   */
  renderSwiper() {
    const { files, current } = this.state
    const { screenWidth, pxRatio } = phone()
    const style = {
      height: `${this.carouselHeight}px`
    }
    return (
      <View style={style}>
        {!!files.length && (
          <Swiper
            style={style}
            circular={false}
            indicatorDots={false}
            autoplay={false}
            current={current}
            onChange={this.onChange}
          >
            {files.map((item, idx) => {
              const { width, height } = getImageSize(
                item.width,
                item.height,
                screenWidth,
                this.carouselHeight,
                pxRatio,
                true
              )
              return (
                <SwiperItem
                  key={item.url}
                  className={styles.item}
                  style={{
                    width: px(width),
                    height: '100%'
                  }}
                >
                  <View
                    className={styles.image}
                    style={{
                      width: px(width),
                      height: px(height)
                    }}
                  >
                    <CImage
                      src={oss(item.url, 750)}
                      width={width}
                      height={height}
                      onClick={() => this.onFullScreen(idx)}
                    />
                    {item.tags.map(i => (
                      <View
                        key={i.id}
                        className={styles.tag}
                        style={{
                          top: `${i.top * 100}%`,
                          left: `${i.left * 100}%`
                        }}
                      >
                        <TagCase
                          text={i.name}
                          reverse={i.reverse}
                          icon={i.product && i.product.id ? 'product-fill' : ''}
                          onClick={() => this.onFullScreen(idx)}
                        />
                      </View>
                    ))}
                  </View>
                </SwiperItem>
              )
            })}
          </Swiper>
        )}
        {this.renderPagination()}
      </View>
    )
  }

  /**
   * 全屏展示图片和标签
   */
  renderSwiperFullScreen() {
    const { fullScreen, files, current } = this.state
    if (!fullScreen) {
      return null
    }

    const { screenWidth, body, pxRatio } = phone()
    return (
      <View className={styles.fullScreen}>
        <Swiper
          style={{
            height: `${body}px`
          }}
          circular={false}
          indicatorDots={false}
          autoplay={false}
          current={current}
          onChange={this.onChange}
        >
          {files.map(item => {
            const { width, height } = getImageSize(
              item.width,
              item.height,
              screenWidth,
              body,
              pxRatio
            )
            return (
              <SwiperItem key={item.url}>
                <View
                  className={c(
                    styles.fullScreenItem,
                    'flex flex-justify-center'
                  )}
                  onClick={this.onCloseFullScreen}
                >
                  <View
                    className={styles.fullScreenItemWrap}
                    onClick={this.preventDefault}
                  >
                    <CImage
                      mode='aspectFit'
                      src={oss(item.url, 750)}
                      width={width}
                      height={height}
                    />
                    {item.tags.map(i => (
                      <View
                        key={i.id}
                        className={styles.tag}
                        style={{
                          top: `${i.top * 100}%`,
                          left: `${i.left * 100}%`
                        }}
                      >
                        <TagCase
                          text={i.name}
                          arrow={!!(i.title || i.desc)}
                          reverse={i.reverse}
                          icon={i.product && i.product.id ? 'product-fill' : ''}
                          onClick={() => this.onTagClick(i)}
                        />
                      </View>
                    ))}
                  </View>
                </View>
              </SwiperItem>
            )
          })}
        </Swiper>
        <View
          className={c(styles.fullScreenClose, 'flex flex-justify-center')}
          onClick={this.onCloseFullScreen}
        >
          <Iconfont className='t-36 l-36 t-plain' name='close' />
        </View>
        {this.renderPagination()}
      </View>
    )
  }

  /**
   * 标签点击后展开查看详情的框
   */
  renderLayout() {
    const { open, item } = this.state
    return (
      <Layout open={open} showMask={false} onClose={this.onClose}>
        <View className={styles.layout}>
          <View className={c(styles.layoutHeader, 'flex')}>
            {!!item.thumb && (
              <CImage
                className='mr-20'
                width={132}
                src={item.thumb}
                radius='sm'
              />
            )}
            <View className='flex-1'>
              <Text
                className={c('t-44 l-56 t-title t-m', {
                  't-c1': item.thumb,
                  't-c2': !item.thumb
                })}
              >
                {item.title}
              </Text>
              {!!item.link && (
                <View
                  className={c(styles.layoutLink, 'mt-20')}
                  onClick={() => this.onLinkClick(item.link)}
                >
                  <Text className='t-28 l-40 t-link t-c1'>{item.link}</Text>
                </View>
              )}
            </View>
          </View>
          <Text className={c(styles.layoutDetail, 't-28 l-50 t-desc mt-24')}>
            {item.desc}
          </Text>
          <View
            className={c(styles.layoutClose, 'flex flex-justify-center')}
            onClick={this.onClose}
          >
            <Iconfont className='t-28 t-sub' name='close' />
          </View>
        </View>
      </Layout>
    )
  }

  render() {
    const { className } = this.props
    return (
      <View className={c(styles.photos, className)}>
        {this.renderSwiper()}
        {this.renderSwiperFullScreen()}
        {this.renderLayout()}
      </View>
    )
  }
}

export default sfc(Photos, {
  className: '',
  current: 0,
  data: [],
  onChange: Function.prototype
})

/**
 * 根据图片宽高, 获取图片background-size: contain后的实际宽高
 * @param {*} width     图片宽度
 * @param {*} height    图片高度
 * @param {*} maxWidth  容器宽度
 * @param {*} maxHeight 容器高度
 * @param {*} isResize  是否拉伸
 */
function getImageSize(
  width,
  height,
  maxWidth,
  maxHeight,
  pxRatio
  // isResize
) {
  let _width
  let _height
  let resizeRatio
  if (width / (maxWidth / maxHeight) > height) {
    const w = maxWidth / pxRatio
    if (width > w) {
      resizeRatio = w / width
      _height = height * resizeRatio
    } else {
      resizeRatio = width / w
      _height = height / resizeRatio
    }
    _width = w
  } else {
    const h = maxHeight / pxRatio
    if (height > h) {
      resizeRatio = h / height
      _width = width * resizeRatio
    } else {
      resizeRatio = height / h
      _width = width / resizeRatio
    }
    _height = h
  }

  return {
    width: _width,
    height: _height
  }
}
