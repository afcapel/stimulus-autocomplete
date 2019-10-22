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

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
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

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o) {
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var it,
      normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var _default = /*#__PURE__*/function (_Controller) {
  _inherits(_default, _Controller);

  var _super = _createSuper(_default);

  function _default() {
    _classCallCheck(this, _default);

    return _super.apply(this, arguments);
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
      var _iterator = _createForOfIteratorHelper(this.resultsTarget.querySelectorAll('[aria-selected="true"]')),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var el = _step.value;
          el.removeAttribute("aria-selected");
          el.classList.remove("active");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
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

      var _iterator2 = _createForOfIteratorHelper(this.resultsTarget.querySelectorAll('[role="option"]:not([id])')),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var el = _step2.value;
          el.id = "".concat(this.resultsTarget.id, "-option-").concat(id++);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
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
