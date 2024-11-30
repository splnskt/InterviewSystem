// vue.config.js

module.exports = {
    devServer: {
      proxy: {
        '/api': { // 代理标识符，可以根据需要修改
          target: 'http://localhost:8080', // 后端服务器的地址
          changeOrigin: true, // 是否改变请求源
          pathRewrite: {
            '^/api': '', // 将 '/api' 前缀重写为空，具体根据后端 API 路径调整
          },
        },
      },
    },
  };
  