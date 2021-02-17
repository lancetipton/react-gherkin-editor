"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gherkinLinter = _interopRequireDefault(require("../../lib/gherkin-linter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    const later = () => {
      clearTimeout(timeout);
      typeof func === 'function' && func.apply(void 0, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

class GherkinAnnotator {
  constructor(session, onParse) {
    this.session = session;
    this.onParse = onParse;

    _defineProperty(this, "linter", void 0);

    _defineProperty(this, "language", 'en');

    _defineProperty(this, "mode", '');

    _defineProperty(this, "debouncedAnnotate", debounce(value => {
      this.annotateNow(value);
    }, 250));

    this.linter = new _gherkinLinter.default(onParse);
  }

  setSession(session) {
    this.session = session;
  }

  setLanguage(language) {
    this.language = language;
  }

  setMode(mode) {
    switch (mode) {
      case 'gherkin_background_i18n':
        this.mode = 'background';
        break;

      case 'gherkin_scenario_i18n':
        this.mode = 'scenario';
        break;

      default:
        this.mode = '';
    }
  }

  annotate(value) {
    this.debouncedAnnotate(value);
  }

  async annotateNow(value) {
    const errors = await this.lint(value);
    if (!Array.isArray(errors)) return;
    errors.length > 0 ? this.session.setAnnotations(errors) : this.session.clearAnnotations();
  }

  async lint(value) {
    return this.linter.setLanguage(this.language).setSubsetType(this.mode).parse(value).getLintingErrors();
  }

}

exports.default = GherkinAnnotator;