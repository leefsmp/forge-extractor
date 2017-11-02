require('babel-core/register')({
  plugins: ['transform-decorators-legacy'],
  presets: ['es2015-node5', 'stage-0']
})

require('../index')