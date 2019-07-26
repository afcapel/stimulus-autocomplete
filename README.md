# Stimulus Autocomplete controller

This is a tiny stimulus controller (1.5kB gzipped) to make a selection from a
list of results fetched from the server.

![Demo](https://media.giphy.com/media/5dYbYLVX4fSbbdyN84/giphy.gif)

## Installation

`yarn add stimulus-autocomplete`

## Usage

Load your stimulus application as usual and the register the autocomplete
controller with it:

```
import { Application } from 'stimulus'
import { definitionsFromContext } from 'stimulus/webpack-helpers'
import { Autocomplete } from 'stimulus-autocomplete'

const application = Application.start()

const context = require.context('controllers', true, /.js$/)
application.load(definitionsFromContext(context))

application.register('autocomplete', Autocomplete)
```

To use the autocomplete, you need some markup as this:

```html
<div data-controller="autocomplete" data-autocomplete-url="/birds/search">
  <input type="text" data-target="autocomplete.input"/>
  <input type="hidden" name="bird_id" data-target="autocomplete.hidden"/>
  <ul data-target="autocomplete.results"></ul>
</div>
```

The component makes a request to the `data-autocomplete-url` to fetch results for
the contents of the input field. The server must answer with an html fragment:

```html
<li role="option" data-autocomplete-value="1">Blackbird</li>
<li role="option" data-autocomplete-value="2">Bluebird</li>
<li role="option" data-autocomplete-value="3">Mockingbird</li>
```

If the controller has a `hidden` target, that field will be updated with the value
of the selected option. Otherwise, the search text field will be updated.

## Using with an external API or a JSON API

If you do not control the API response to format the data into the required format,
you can subclass the autocomplete controller and define a `handleAutocompleteResponse`
method, which receives a [`fetch` response](https://developer.mozilla.org/en-US/docs/Web/API/Response) as it's only parameter.

This method must return HTML in the format described above, or similar format that
has the tags `role="option"` and `data-autocomplete-value="..."`

For example:

```js
// autocomplete_controller.js
import { Autocomplete } from "stimulus-autocomplete"

export default class extends Autocomplete {
  async handleAutocompleteResponse(response) {
    const json = await response.json()

    return json.map(item => {
      return `<li role="option" data-autocomplete-value="${item.id}">${item.name}</li>`
    });
  }
}
```

While the style above works nicely, consider using template tags for reusable code.

## Handling selection presentation

To modify how the plugin reacts when an item is selected, simply define `onSelect`
in your autocomplete controller.

For example,

```js
// autocomplete_controller.js
import { Autocomplete } from "stimulus-autocomplete"

export default class extends Autocomplete {
  onSelect(selectedItem) {
    const value = selectedItem.textContent.trim()

    alert(`You selected ${value}`)
  }
}
```

## Events

* `autocomplete.change` fires when the users selects a new value from the autocomplete
field. The event `detail` contains the `value` and `textValue` properties of the
selected result.
* `loadstart` fires before the autocomplete fetches the results from the server.
* `load` fires when results have been successfully loaded.
* `error` fires when there's an error fetching the results.
* `loadend` fires when the request for results ends, successfully or not.
* `toggle` fires when the results element is shown or hidden.

## Optional parameters

* `min-length` set the minimum number of charaters required to make an autocomplete request.
* `active-class` set which class is used when an element is selected. Can be a list of classes.  Default: `active`.
* `query-param` set what to use as the query param on the autocomplete url. Default: `q`

NOTE: All optional parameters are data-properties, prefixed as `data-autocomplete-OPTION`.

For example:

```html
<div data-controller="autocomplete" data-autocomplete-min-length="2" data-autocomplete-active-class="bg-blue-200 text-blue-800">
</div>
```

## Credits

Heavily inspired on [github's autocomplete element](https://github.com/github/auto-complete-element).

## Contributing

Bug reports and pull requests are welcome on GitHub at <https://github.com/afcapel/stimulus-autocomplete>.  This project is intended to be a safe, welcoming space for  collaboration, and contributors are expected to adhere to the  Contributor Covenant code of conduct.

## License

This package is available as open source under the terms of the MIT License.
