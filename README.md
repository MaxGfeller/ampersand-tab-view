# ampersand-tab-view

Tabbed view for [Ampersand.js](http://ampersandjs.com)

## Usage

`ampersand-tab-view` can be instantiated like any ampersand view class:
```javascript
var TabView = require('ampersand-tab-view')
var view = new TabView({ ... })
```

However, there are some arguments that you must provide:
- `el`: The element in which the content of the tabs should be rendered
- `tabContainer`: The DOM element in which the tabs itself should be rendered
- `tabViewClass`: A view class for the tabs

To get a better overview, check out the example in `example/`.

## Requirements for the `tabViewClass`

The `tabViewClass` must be specified when using `ampersand-tab-view` and is used
to display single tabs. This way you have the ultimate control over the tab's
look and feel.

When a new tab is opened, the view class is being instantiated with a
`TabViewModel` set as model. This model has only two properties:
- `id`: A random identifier. You probably won't need this one
- `title`: The title of the tab. You define how (or if) it will be rendered

You also have the control over when a tab should be closed. Just trigger a
`close` event if you want the tab and its content removed.

If you think a tab should be activated, trigger the `activate` event.

The library itself controls then which tab is active, which should be activated
when one is closed and so on. To represent this visually, we defined two methods
that should to be implemented in your tab view class:
- `activateTab`: Just set the CSS class there
- `deactivateTab`: You probably want to remove the CSS class again

## API

### `openTab(title, contentView)`

Opens (and activates) a new tab. Returns the tab's id.

### `activateTab(id)`

Activate the tab with the given id.
