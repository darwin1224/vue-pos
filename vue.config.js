/**
 * @type {import('@vue/cli-service'.ProjectOptions)}
 */
module.exports = {
  transpileDependencies: ['vuetify'],
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map',
  },
};
