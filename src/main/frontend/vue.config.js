"use strict"

// https://webpack.js.org/configuration/dev-server/#devserver-proxy

const targetHost = "localhost"
const targetPort = 8090
const webpack = require('webpack');
const port = 8080
let cookie

const replaceCookie = function(cookie) {
  return cookie.replace(/\s+domain=[^\s;]+;?/, "").replace(/\s+secure;?/, "")
}

module.exports = {
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'DoctorMono',
    themeColor: '#172b4d',
    msTileColor: '#172b4d',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#172b4d'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  },
  outputDir: "../resources/static",
  devServer: {
    port: port,
    clientLogLevel: "debug",
    historyApiFallback: true,
    hot: true,
    inline: true,
    publicPath: `http://localhost:${port}/`,
    transportMode: "sockjs",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "^/ws": {
        target: `http://${targetHost}:${targetPort}`,
        changeOrigin: true,
        ws: true,
        onProxyReq: (proxyReq) => {
          if (proxyReq.getHeader("origin")) {
            proxyReq.setHeader("origin", `http://${targetHost}:${targetPort}`)
          }

          if (proxyReq.getHeader("set-cookie")) {
            proxyReq.headers["set-cookie"] = proxyReq.headers["set-cookie"].map(
              replaceCookie
            )
          }

          if (cookie) proxyReq.setHeader("Cookie", cookie)
        },
        onProxyRes: (proxyRes) => {
          if (proxyRes.headers["set-cookie"]) {
            cookie = proxyRes.headers["set-cookie"] = proxyRes.headers[
              "set-cookie"
            ].map(replaceCookie)
          }
        },
      },
      "^/(sse|api|sign|resources)": {
        target: `http://${targetHost}:${targetPort}`,
        changeOrigin: true,
        onProxyRes: (proxyRes) => {
          if (proxyRes.headers["set-cookie"]) {
            cookie = proxyRes.headers["set-cookie"] = proxyRes.headers[
              "set-cookie"
            ].map(replaceCookie)
          }
        },
      },
    },
  },
  pluginOptions: {
    moment: {
      locales: ["ko_kr"],
    },
  },
}
