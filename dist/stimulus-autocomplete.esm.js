import { Controller } from 'stimulus';
import debounce from 'lodash.debounce';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var _default =
/*#__PURE__*/
function (_Controller) {
  _inherits(_default, _Controller);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, _getPrototypeOf(_default).apply(this, arguments));
  }

  _createClass(_default, [{
    key: "connect",
    value: function connect() {
      this.resultsTarget.hidden = true;
      this.inputTarget.setAttribute("autocomplete", "off");
      this.inputTarget.setAttribute("spellcheck", "false");
      this.mouseDown = false;
      this.onInputChange = debounce(this.onInputChange.bind(this), 300);
      this.onResultsClick = this.onResultsClick.bind(this);
      this.onResultsMouseDown = this.onResultsMouseDown.bind(this);
      this.onInputBlur = this.onInputBlur.bind(this);
      this.onKeydown = this.onKeydown.bind(this);
      this.inputTarget.addEventListener("keydown", this.onKeydown);
      this.inputTarget.addEventListener("blur", this.onInputBlur);
      this.inputTarget.addEventListener("input", this.onInputChange);
      this.resultsTarget.addEventListener("mousedown", this.onResultsMouseDown);
      this.resultsTarget.addEventListener("click", this.onResultsClick);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.inputTarget.removeEventListener("keydown", this.onKeydown);
      this.inputTarget.removeEventListener("focus", this.onInputFocus);
      this.inputTarget.removeEventListener("blur", this.onInputBlur);
      this.inputTarget.removeEventListener("input", this.onInputChange);
      this.resultsTarget.removeEventListener("mousedown", this.onResultsMouseDown);
      this.resultsTarget.removeEventListener("click", this.onResultsClick);
    }
  }, {
    key: "sibling",
    value: function sibling(next) {
      var options = Array.from(this.resultsTarget.querySelectorAll('[role="option"]'));
      var selected = this.resultsTarget.querySelector('[aria-selected="true"]');
      var index = options.indexOf(selected);
      var sibling = next ? options[index + 1] : options[index - 1];
      var def = next ? options[0] : options[options.length - 1];
      return sibling || def;
    }
  }, {
    key: "select",
    value: function select(target) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.resultsTarget.querySelectorAll('[aria-selected="true"]')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var el = _step.value;
          el.removeAttribute("aria-selected");
          el.classList.remove("active");
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      target.setAttribute("aria-selected", "true");
      target.classList.add("active");
      this.inputTarget.setAttribute("aria-activedescendant", target.id);
    }
  }, {
    key: "onKeydown",
    value: function onKeydown(event) {
      switch (event.key) {
        case "Escape":
          if (!this.resultsTarget.hidden) {
            this.hideAndRemoveOptions();
            event.stopPropagation();
            event.preventDefault();
          }

          break;

        case "ArrowDown":
          {
            var item = this.sibling(true);
            if (item) this.select(item);
            event.preventDefault();
          }
          break;

        case "ArrowUp":
          {
            var _item = this.sibling(false);

            if (_item) this.select(_item);
            event.preventDefault();
          }
          break;

        case "Tab":
          {
            var selected = this.resultsTarget.querySelector('[aria-selected="true"]');

            if (selected) {
              this.commit(selected);
            }
          }
          break;

        case "Enter":
          {
            var _selected = this.resultsTarget.querySelector('[aria-selected="true"]');

            if (_selected && !this.resultsTarget.hidden) {
              this.commit(_selected);
              event.preventDefault();
            }
          }
          break;
      }
    }
  }, {
    key: "onInputBlur",
    value: function onInputBlur() {
      if (this.mouseDown) return;
      this.resultsTarget.hidden = true;
    }
  }, {
    key: "commit",
    value: function commit(selected) {
      if (selected.getAttribute("aria-disabled") === "true") return;

      if (selected instanceof HTMLAnchorElement) {
        selected.click();
        this.resultsTarget.hidden = true;
        return;
      }

      var textValue = selected.textContent.trim();
      var value = selected.getAttribute("data-autocomplete-value") || textValue;
      this.inputTarget.value = textValue;

      if (this.hasHiddenTarget) {
        this.hiddenTarget.value = value;
      } else {
        this.inputTarget.value = value;
      }

      this.inputTarget.focus();
      this.hideAndRemoveOptions();
      this.element.dispatchEvent(new CustomEvent("autocomplete.change", {
        bubbles: true,
        detail: {
          value: value,
          textValue: textValue
        }
      }));
    }
  }, {
    key: "onResultsClick",
    value: function onResultsClick(event) {
      if (!(event.target instanceof Element)) return;
      var selected = event.target.closest('[role="option"]');
      if (selected) this.commit(selected);
    }
  }, {
    key: "onResultsMouseDown",
    value: function onResultsMouseDown() {
      var _this = this;

      this.mouseDown = true;
      this.resultsTarget.addEventListener("mouseup", function () {
        return _this.mouseDown = false;
      }, {
        once: true
      });
    }
  }, {
    key: "onInputChange",
    value: function onInputChange() {
      this.element.removeAttribute("value");
      this.fetchResults();
    }
  }, {
    key: "identifyOptions",
    value: function identifyOptions() {
      var id = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.resultsTarget.querySelectorAll('[role="option"]:not([id])')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var el = _step2.value;
          el.id = "".concat(this.resultsTarget.id, "-option-").concat(id++);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "hideAndRemoveOptions",
    value: function hideAndRemoveOptions() {
      this.resultsTarget.hidden = true;
      this.resultsTarget.innerHTML = null;
    }
  }, {
    key: "fetchResults",
    value: function fetchResults() {
      var _this2 = this;

      var query = this.inputTarget.value.trim();

      if (!query || query.length < this.minLength) {
        this.hideAndRemoveOptions();
        return;
      }

      if (!this.src) return;
      var url = new URL(this.src, window.location.href);
      var params = new URLSearchParams(url.search.slice(1));
      params.append("q", query);
      url.search = params.toString();
      this.element.dispatchEvent(new CustomEvent("loadstart"));
      fetch(url.toString()).then(function (response) {
        return response.text();
      }).then(function (html) {
        _this2.resultsTarget.innerHTML = html;

        _this2.identifyOptions();

        var hasResults = !!_this2.resultsTarget.querySelector('[role="option"]');
        _this2.resultsTarget.hidden = !hasResults;

        _this2.element.dispatchEvent(new CustomEvent("load"));

        _this2.element.dispatchEvent(new CustomEvent("loadend"));
      })["catch"](function () {
        _this2.element.dispatchEvent(new CustomEvent("error"));

        _this2.element.dispatchEvent(new CustomEvent("loadend"));
      });
    }
  }, {
    key: "open",
    value: function open() {
      if (!this.resultsTarget.hidden) return;
      this.resultsTarget.hidden = false;
      this.element.setAttribute("aria-expanded", "true");
      this.element.dispatchEvent(new CustomEvent("toggle", {
        detail: {
          input: this.input,
          results: this.results
        }
      }));
    }
  }, {
    key: "close",
    value: function close() {
      if (this.resultsTarget.hidden) return;
      this.resultsTarget.hidden = true;
      this.inputTarget.removeAttribute("aria-activedescendant");
      this.element.setAttribute("aria-expanded", "false");
      this.element.dispatchEvent(new CustomEvent("toggle", {
        detail: {
          input: this.input,
          results: this.results
        }
      }));
    }
  }, {
    key: "src",
    get: function get() {
      return this.data.get("url");
    }
  }, {
    key: "minLength",
    get: function get() {
      var minLength = this.data.get("min-length");

      if (!minLength) {
        return 0;
      }

      return parseInt(minLength, 10);
    }
  }]);

  return _default;
}(Controller);

_defineProperty(_default, "targets", ["input", "hidden", "results"]);

export { _default as Autocomplete };
