// const { resolve } = require("core-js/fn/promise");
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath:'/',
  outputDir:'dist',
  assetsDir:'static',
  devServer:{
    open:true,
    proxy:{
      '/api':{
        target: process.env.VUE_APP_BASE_API,
        changeOrigin:true,
        pathRewrite:{
          '^/api':'/'
        }
      }
    }
  },
  configureWebpack:{
    resolve:{
      alias:{
        '@':resolve('src')
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        //path.resolve(__dirname, './src/assets/css/global.less') 
      ]
    }
  }
}
