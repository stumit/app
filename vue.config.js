const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// defineConfig 帮手函数，以获得更好的类型提示
module.exports = defineConfig({
  /*
  transpileDependencies:默认为false
    默认情况下 babel-loader 会忽略所有 node_modules 中的文件。
    启用本选项，以避免构建后的代码中出现未转译的第三方依赖。
  */ 
  transpileDependencies: true,

  //代理跨域 
  devServer: {
    proxy: {
      // 当路径中有/api时，就会启动代理服务器
      '/api': {
        // 代理服务器从从哪里获取数据
        target: 'http://gmall-h5-api.atguigu.cn',
        // 路径重写
        // pathRewrite: { '^/api': '' },
      },
    },
  },
  // element-plus按需导入
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})
