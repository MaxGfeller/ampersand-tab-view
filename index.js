var cuid = require('cuid')
var View = require('ampersand-view')
var ViewSwitcher = require('ampersand-view-switcher')
var Collection = require('ampersand-collection')
var Model = require('ampersand-model')
var TabViewModel = require('./tab-view-model')

var TabModel = Model.extend({
  type: 'TabModel',
  props: {
    id: 'string',
    tabView: 'object',
    contentView: 'object'
  }
})

var TabCollection = Collection.extend({
  model: TabModel,
  mainIndex: 'id',
  session: {
    history: 'array',
    view: 'object'
  }
})

module.exports = View.extend({
  template: '<div></div>',
  props: {
    tabContainer: 'object',
    tabs: 'object',
    tabViewClass: 'function',
    tabHistory: 'array'
  },
  render: function() {
    if (!this.tabViewClass) throw new Error('no tab view class set!')
    if (!this.tabs) this.tabs = new TabCollection()
    if (!this.tabHistory) this.tabHistory = []

    this.renderWithTemplate()
    this.pageSwitcher = new ViewSwitcher(this.el)
  },
  openTab: function(title, contentView) {
    var tabId = cuid.slug()

    var tabView = new this.tabViewClass({
      el: document.createElement('div'),
      model: new TabViewModel({
        id: tabId,
        title: title
      })
    })

    var tabModel = new TabModel({
      id: tabId,
      tabView: tabView,
      contentView: contentView
    })
    this.tabs.add(tabModel)

    var self = this
    tabView._events['close'] = [{
      callback: function() {
        this.tabView.remove()
        this.contentView.remove()

        self.tabHistory = self.tabHistory.filter(function(t) {
          if (t !== this.id) return true
          return false
        }.bind(this))

        // if (self.tabHistory[self.tabHistory.length - 1] !== this.id) return
        var active = self.tabHistory[self.tabHistory.length - 1]
        self.activateTab(active)
      }.bind({
        tabView: tabView,
        contentView: contentView,
        id: tabId,
        self: self
      })
    }]

    tabView._events['activate'] = [{
      callback: this.activateTab.bind(this, tabId)
    }]

    tabView.render()
    var el = tabView.el
    this.tabContainer.firstChild
      ? this.tabContainer.insertBefore(el, this.tabContainer.firstChild)
      : this.tabContainer.appendChild(el)

    this.activateTab(tabId)

    return tabId
  },
  activateTab: function(id) {
    var tab = this.tabs.get(id)
    this.pageSwitcher.set(tab.contentView)
    if (tab.tabView.activateTab) tab.tabView.activateTab()

    this.tabHistory = this.tabHistory.filter(function(t) {
      if (t !== id) return true
      return false
    })

    if (this.tabHistory.length > 0) {
      var previouslyActiveTab = this.tabHistory[this.tabHistory.length - 1]
      this.tabs.get(previouslyActiveTab).tabView.deactivateTab()
    }

    this.tabHistory.push(id)
  }
})
