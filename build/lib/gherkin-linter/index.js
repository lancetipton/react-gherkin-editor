"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gherkin = require("@cucumber/gherkin");

var _gherkinLanguages = _interopRequireDefault(require("../gherkin-languages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class GherkinLinter {
  constructor(onParse) {
    this.onParse = onParse;

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "isSubset", void 0);

    _defineProperty(this, "subsetType", void 0);

    _defineProperty(this, "language", void 0);

    _defineProperty(this, "featureKeyword", void 0);

    _defineProperty(this, "lastParsedGherkin", void 0);

    _defineProperty(this, "lintingErrors", void 0);

    this.options = {
      includeGherkinDocument: true,
      newId: () => Math.random().toString()
    };
    this.offset = 0;
    this.isSubset = false;
    this.subsetType = '';
    this.language = 'en';
    this.featureKeyword = 'Feature';
    this.lastParsedGherkin = '';
    this.lintingErrors = [];
  }

  setLanguage(language) {
    language || (language = 'en');

    if (this.language === language) {
      return this;
    }

    if (!_gherkinLanguages.default[language]) {
      return this;
    }

    this.language = language;
    this.featureKeyword = _gherkinLanguages.default[this.language].feature[0];
    this.lastParsedGherkin = '';
    return this;
  }

  setSubsetType(type) {
    if (type === this.subsetType) {
      return this;
    }

    if (type === 'scenario' || type === 'background') {
      this.subsetType = type;
      this.isSubset = true;
    } else {
      this.subsetType = '';
      this.isSubset = false;
    }

    this.lastParsedGherkin = '';
    return this;
  }

  parse(gherkin) {
    if (gherkin === this.lastParsedGherkin) {
      return this;
    }

    this.parseGherkin(gherkin);
    this.lastParsedGherkin = gherkin;
    return this;
  }

  getLintingErrors() {
    return this.lintingErrors;
  }

  parseGherkin(gherkin) {
    const messages = (0, _gherkin.generateMessages)(this.getContentToLint(gherkin), '', _objectSpread({
      includeSource: !!this.onParse
    }, this.options));
    this.lintingErrors = messages.filter(message => message.parseError).map(message => ({
      line: message.parseError.source.location.line - this.offset,
      row: message.parseError.source.location.line - 1 - this.offset,
      character: message.parseError.source.location.column,
      column: message.parseError.source.location.column - 1,
      text: this.removeLineNumber(message.parseError.message),
      type: 'warning'
    }));
    this.onParse && this.onParse(messages);
  }

  getContentToLint(gherkin) {
    let featurePrefix = '';
    this.offset = 0;

    if (this.language !== 'en') {
      this.offset += 1;
      featurePrefix = "# language: ".concat(this.language, "\n");
    }

    if (this.isSubset) {
      const subsetKeyword = _gherkinLanguages.default[this.language][this.subsetType][0];
      featurePrefix = "".concat(featurePrefix).concat(this.featureKeyword, ":\n").concat(subsetKeyword, ":\n");
      this.offset += 2;
    }

    return "".concat(featurePrefix).concat(gherkin);
  }

  removeLineNumber(errorMessage) {
    return errorMessage.split(' ').slice(1).join(' ');
  }

}

exports.default = GherkinLinter;