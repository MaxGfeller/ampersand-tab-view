var Model = require('ampersand-model')

module.exports = Model.extend({
  type: 'TabViewModel',
  props: {
    id: 'string',
    title: 'string'
  }
})
