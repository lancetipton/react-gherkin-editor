"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageDropdownContainer = exports.ToolbarContainer = void 0;

var _reStyle = require("@keg-hub/re-theme/reStyle");

var _view = require("@keg-hub/keg-components/view");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ToolbarContainer = (0, _reStyle.reStyle)('div')((__, props) => _objectSpread(_objectSpread({}, props === null || props === void 0 ? void 0 : props.style), {}, {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 3,
  backgroundColor: 'rgb(235, 236, 240)'
}));
exports.ToolbarContainer = ToolbarContainer;
const LanguageDropdownContainer = (0, _reStyle.reStyle)('div')((__, props) => _objectSpread(_objectSpread({}, props === null || props === void 0 ? void 0 : props.style), {}, {
  minWidth: 150
}));
exports.LanguageDropdownContainer = LanguageDropdownContainer;