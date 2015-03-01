var View = require('ampersand-view')
var TabbedView = require('../')

var TabView = View.extend({
  template: '<div><a data-hook="title"></a> <a data-hook="close">x</a></div>',
  bindings: {
    'model.title': {
      'type': 'text',
      'hook': 'title'
    }
  },
  events: {
    'click [data-hook=close]': 'closeTab',
    'click [data-hook=title]': 'triggerTabActivation'
  },
  closeTab: function(evt) {
    this.trigger('close')
  },
  triggerTabActivation: function() {
    this.trigger('activate')
  },
  activateTab: function() {
    this.queryByHook('title').style.backgroundColor = 'yellow'
  },
  deactivateTab: function() {
    this.queryByHook('title').style.backgroundColor = 'white'
  }
})

var t = new TabbedView({
  tabViewClass: TabView,
  tabContainer: document.getElementById('tabContainer'),
  el: document.getElementById('main')
})

t.render()
t.openTab('Tab 1', new View({ template: '<span>View of Tab 1</span>'}))
t.openTab('Tab 2', new View({ template: '<span>View of Tab 2</span>'}))
t.openTab('Tab 3', new View({ template: '<span>View of Tab 3</span>'}))
t.openTab('Tab 4', new View({ template: '<span>View of Tab 4</span>'}))

window.View = View
window.tabbedView = t
