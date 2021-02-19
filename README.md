# Stimulus Autocomplete controller

This is a tiny stimulus controller (1.5kB gzipped) to make a selection from a
list of results fetched from the server.

![Demo](https://media.giphy.com/media/5dYbYLVX4fSbbdyN84/giphy.gif)

## Installation

```plain
yarn add stimulus-autocomplete
```

## Usage

Load your stimulus application as usual and the register the autocomplete
controller with it:

```javascript
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
<div data-controller="autocomplete" data-autocomplete-url-value="/birds/search">
  <input type="text" data-autocomplete-target="input"/>
  <input type="hidden" name="bird_id" data-autocomplete-target="hidden"/>
  <ul class="list-group" data-autocomplete-target="results"></ul>
</div>
```

The component makes a request to the `data-autocomplete-url` to fetch results for
the contents of the input field. The server must answer with an html fragment:

```html
<li class="list-group-item" role="option" data-autocomplete-value="1">Blackbird</li>
<li class="list-group-item" role="option" data-autocomplete-value="2">Bluebird</li>
<li class="list-group-item" role="option" data-autocomplete-value="3">Mockingbird</li>
```

Note: class `list-group` on `<ul>` and `list-group-item` on `<li>` is required to apply the same css as displayed in the gif above.

Items can be included that are not selectable, such as help text or delimiters using `aria-disabled` attribute:

```html
<li role="option" aria-disabled="true">Start typing to search...</li>
```

If the controller has a `hidden` target, that field will be updated with the value
of the selected option. Otherwise, the search text field will be updated.

The height of the result list can be limited with CSS, e.g.:

```html
<ul class="list-group" data-autocomplete-target="results" style="max-height: 10rem; overflow-y: scroll;"></ul>
```

## Events

Events on the main element that registered the controller:

* `autocomplete.change` fires when the users selects a new value from the autocomplete
field. The event `detail` contains the `value` and `textValue` properties of the
selected result.
* `loadstart` fires before the autocomplete fetches the results from the server.
* `load` fires when results have been successfully loaded.
* `error` fires when there's an error fetching the results.
* `loadend` fires when the request for results ends, successfully or not.
* `toggle` fires when the results element is shown or hidden.

Events on the optional hidden input:

* `input` and `change` dispatched to it when the users selects a new value from the autocomplete. This allows you to bind subsequent behavior directly to the `<input type=hidden>` element.

## Optional parameters

* `min-length` set the minimum number of charaters required to make an autocomplete request.
* `submit-on-enter` submit the form after the autocomplete selection via enter keypress.
* `data-autocomplete-label` can be used to define the input label upon selection. That way your option elements can have more elaborate markup, i.e.:

  ```html
  <li class="list-group-item" role="option" data-autocomplete-value="1" data-autocomplete-label="Blackbird">
    <p>Blackbird</p>
    <p class="text-muted"><small>That's also the name of an airplane</small></p>
  </li>
  ```

## Optional HTML configuration

* If the `<input>` target has an `autofocus` attribute then the input will be given focus immediately so the user can start typing. This is useful if the `<input>` is dynamically added/morphed into the DOM (say by a "edit" button) and the user expects to start typing immediately.

## Example

[This repo](https://github.com/afcapel/stimulus-autocomplete-example) contains a minimal example of how
to use the library.

## Credits

Heavily inspired on [github's autocomplete element](https://github.com/github/auto-complete-element).

## Contributing

Bug reports and pull requests are welcome on GitHub at <https://github.com/afcapel/stimulus-autocomplete>.  This project is intended to be a safe, welcoming space for  collaboration, and contributors are expected to adhere to the  Contributor Covenant code of conduct.

## Release a new version

To release a new version follow these steps:

1. Update the version number in `package.json`. Try to follow
semantic versioning guidelines as much as possible.

2. Build the package with `npm run build`

3. Publish the package to npmjs.com with `npm publish`

## License

This package is available as open source under the terms of the MIT License.
