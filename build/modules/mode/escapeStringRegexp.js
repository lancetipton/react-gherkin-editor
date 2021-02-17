"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeStringRegexp = void 0;

const escapeStringRegexp = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');

exports.escapeStringRegexp = escapeStringRegexp;