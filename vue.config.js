/**
 * @type {import('@vue/cli-service'.ProjectOptions)}
 */
module.exports = {
  transpileDependencies: ['vuetify'],
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-pos/' : '/',
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map',
  },
};
