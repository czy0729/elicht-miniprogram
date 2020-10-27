/*
 * @Author: czy0729
 * @Date: 2020-08-07 10:00:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-27 10:19:41
 */
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import { ContentStore } from '@stores'
import Index from './pages/index/index'
import './app.scss'

const store = {
  ContentStore
}

class App extends Component {
  config = {
    pages: [
      'pages/photo/index',
      'pages/index/index',
      'pages/next/index',
      'pages/to-miniprogram/index',
      'pages/share-timeline/index'
    ],
    window: {
      backgroundColor: '#ffffff',
      backgroundColorBottom: '#ffffff',
      backgroundColorTop: '#ffffff',
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTextStyle: 'black',
      navigationBarTitleText: '云知光'
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
