/*
 * @Author: czy0729
 * @Date: 2019-06-10 11:53:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-27 14:36:59
 */
const path = require('path')
const sassImportor = function(url) {
  const reg = /^@styles\/(.*)/
  return {
    file: reg.test(url)
      ? path.resolve(__dirname, '..', 'src/styles', url.match(reg)[1])
      : url
  }
}

const config = {
  projectName: 'taroDemo',
  date: '2019-6-7',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  babel: {
    sourceMap: true,
    presets: [
      [
        'env',
        {
          modules: false
        }
      ]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      [
        'transform-runtime',
        {
          helpers: false,
          polyfill: false,
          regenerator: true,
          moduleName: 'babel-runtime'
        }
      ]
    ]
  },
  sass: {
    importer: sassImportor
  },
  defineConstants: {},
  alias: {
    '@app': path.resolve(__dirname, '..', 'src/components/app'),
    '@assets': path.resolve(__dirname, '..', 'src/assets'),
    '@base': path.resolve(__dirname, '..', 'src/components/base'),
    '@components': path.resolve(__dirname, '..', 'src/components'),
    '@constants': path.resolve(__dirname, '..', 'src/constants'),
    '@mock': path.resolve(__dirname, '..', 'src/mock'),
    '@pages': path.resolve(__dirname, '..', 'src/pages'),
    '@src': path.resolve(__dirname, '..', 'src'),
    '@stores': path.resolve(__dirname, '..', 'src/stores'),
    '@styles': path.resolve(__dirname, '..', 'src/styles'),
    '@utils': path.resolve(__dirname, '..', 'src/utils')
  },
  copy: {
    patterns: [
      // {
      //   from: 'src/assets/h5',
      //   to: 'dist/static/h5'
      // },
      // {
      //   from: 'src/components/wx/cropper/Cropper/',
      //   to: 'dist/components/wx/cropper/Cropper/'
      // },
      {
        from: 'src/components/wx/parser-rich-text/Parser/',
        to: 'dist/components/wx/parser-rich-text/Parser/'
      }
    ],
    options: {}
  },
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8']
        }
      },
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    router: {
      mode: 'browser'
    },
    output: {
      filename: 'js/[name].[hash:4].js',
      chunkFilename: 'js/[name].[chunkhash:4].js'
    },
    imageUrlLoaderOption: {
      limit: 5000,
      name: 'static/images/[name].[hash:4].[ext]'
    },
    miniCssExtractPluginOption: {
      filename: 'css/[name].[hash:4].css',
      chunkFilename: 'css/[name].[chunkhash:4].css'
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8']
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[local]_[hash:base64:3]'
        }
      }
    },
    sassLoaderOption: {
      importer: sassImportor
    },
    esnextModules: ['taro-ui']
  }
}

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
